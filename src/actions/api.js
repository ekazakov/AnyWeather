import contains from 'lodash.contains';
import flow from 'lodash.flow';
import pick from 'lodash.pick';
import {fromJS} from 'immutable';
import request from './request';
import { countryNameByCode } from '../countryCodes';
import SunCalc from 'suncalc';

export function identifyLocationByIp() {
    const format = (location) => {
        const [latitude,longitude] = location.loc.split(',').map(parseFloat);
        return {
            city: location.city,
            country: countryNameByCode(location.country),
            latitude,
            longitude
        };
    };

    return request
        .get('http://ipinfo.io/json')
        .then(flow(format, fromJS))
    ;
}

export function getCityByCoordinates({latitude,longitude}) {
    function format(location) {
        location = location.results[0];
        const {address_components, geometry} = location;

        const addr = address_components.reduce((result, item) => {
            if (contains(item.types, 'administrative_area_level_1')) result['city'] = item.long_name;
            if (contains(item.types, 'country')) result['country'] = countryNameByCode(item.short_name);
            return result;
        }, {});

        return {...addr, latitude: geometry.location.lat, longitude: geometry.location.lng};
    }

    const params = {
        latlng: `${latitude},${longitude}`,
        key: 'AIzaSyA4j833w27tBrLYURwTRCZjlyFlNe2_s8o',
        language: 'en',
        location_type: 'ROOFTOP'
    };

    return request
        .get('https://maps.googleapis.com/maps/api/geocode/json', params)
        .then(flow(format, fromJS))
    ;
}

function sunriseAndSunset(date, latitude, longitude) {
    const {sunrise, sunset} = SunCalc.getTimes(date, latitude, longitude);

    //console.log(`${date}, (${latitude}, ${longitude}) sunrise: ${sunrise}, sunset: ${sunset}`);

    return {
        sunrise: sunrise.valueOf(),
        sunset: sunset.valueOf()
    };
}

export function getWeather({city, country, latitude, longitude}) {
    const format = ([today, forecast]) => {
        const formatForecast = (item) => {
            return {
                ...pick(item, ['pressure', 'humidity', 'speed']),
                date: item.dt,
                dayTemp: item.temp.day,
                nightTemp: item.temp.night,
                condition: pick(item.weather[0], ['main', 'description', 'id']),
                ...sunriseAndSunset(new Date(item.dt * 1000), latitude, longitude),
                isToday: false
            };
        };

        today = {
            ...pick(today.main, ['pressure', 'humidity']),
            date: today.dt,
            curTemp: today.main.temp,
            ...pick(today.sys, ['sunrise', 'sunset']),
            condition: pick(today.weather[0], ['main', 'description', 'id']),
            speed: today.wind.speed,
            isToday: true
        };
        forecast = forecast.list.map(formatForecast);



        return {today, forecast};
    };
    
    return Promise.all([
        request.get('http://api.openweathermap.org/data/2.5/weather', {
            APPID: 'afb68b1c481390fa5c80cec4885c327b',
            q: `${city},${country}`,
            units: 'metric'
        }),
        request.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
            APPID: 'afb68b1c481390fa5c80cec4885c327b',
            q: `${city},${country}`,
            units: 'metric',
            cnt: 5
        })
    ]).then(flow(format, fromJS));
}