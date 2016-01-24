import { AWAIT_MARKER } from 'redux-await';
import * as api from './api';
import { countryNameByCode } from '../countryCodes';
const constants = {
    IDENTIFY_LOCATION: '@@any-weather/IDENTIFY_LOCATION',
    GET_WEATHER: '@@any-weather/GET_WEATHER',
    SELECT_CARD: '@@any-weather/SELECT_CARD'
};

export default constants;

function requestGeoLocation() {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject));
}

export function getWeather(location) {
    return {
        AWAIT_MARKER,
        type: constants.GET_WEATHER,
        payload: {
            weather: api.getWeather(location)
        }
    };
}

export function getLocation(dispatch) {
    const location = requestGeoLocation()
        .catch(api.identifyLocationByIp)
        .then(location => location.coords != null ? api.getCityByCoordinates(location.coords) : location)
        .catch(err => console.error('req err:', err))
    ;

    location
        .then((data) => {
            console.log(data);
            return data;
        })
        .then(location =>
        setTimeout(() =>
            dispatch(getWeather(location.toJS())), 0));

    return {
        AWAIT_MARKER,
        type: constants.IDENTIFY_LOCATION,
        payload: {location}
    };
}

export function initialize() {
    return (dispatch) => {
        dispatch(getLocation(dispatch));
    };
}

export function selectCard(index) {
    return {
        type: constants.SELECT_CARD,
        index
    };
}