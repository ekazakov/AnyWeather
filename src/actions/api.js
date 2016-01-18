import contains from 'lodash.contains';
import flow from 'lodash.flow';
import pick from 'lodash.pick';
import {fromJS} from 'immutable';
import request from './request';
import { countryNameByCode } from '../countryCodes';

export function identifyLocationByIp() {
    const format = (location) =>
        ({ city: location.city, country: countryNameByCode(location.country)});

    return request
        .get('http://ipinfo.io/json')
        .then(flow(format, fromJS))
    ;
}

export function getCityByCoordinates({latitude,longitude}) {
    function format(location) {
        location = location.results[0].address_components;

        return location.reduce((result, item) => {
            if (contains(item.types, 'administrative_area_level_1')) result['city'] = item.long_name;
            if (contains(item.types, 'country')) result['country'] = countryNameByCode(item.short_name);
            return result;
        }, {});
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

export function getWeather({city, country}) {
    const format = ([today, forecast]) => {
        const weather = [];
        weather.push({
            ...pick(today.main, ['pressure', 'humidity']),
            date: today.dt,
            curTemp: today.main.temp,
            ...pick(today.sys, ['sunrise', 'sunset']),
            sky: pick(today.weather[0], ['main', 'description']),
            speed: today.wind.speed,
            isToday: true
        });

        const formatForecast = (item) => ({
            ...pick(item, ['pressure', 'humidity', 'speed']),
            date: item.dt,
            dayTemp: item.temp.day,
            nightTemp: item.temp.night,
            sky: pick(item.weather, ['main', 'description']),
            // TODO: calculate sunrise and sunset
            isToday: false
        });

        return weather.concat(forecast.list.map(formatForecast));
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