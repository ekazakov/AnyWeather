import { AWAIT_MARKER } from 'redux-await';
import * as api from './api';
import { countryNameByCode } from '../countryCodes';
const constants = {
    IDENTIFY_LOCATION: '@@any-weather/IDENTIFY_LOCATION',
    GET_WEATHER: '@@any-weather/GET_WEATHER',
    SELECT_CARD: '@@any-weather/SELECT_CARD',
    LOCATION_INPUT_CHANGE: '@@any-weather/LOCATION_INPUT_CHANGE',
    UPDATE_LOCATION: '@@any-weather/UPDATE_LOCATION'
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
            weather: api.getWeather(location.toJS())
        }
    };
}

export function updateLocation(location) {
    return {
        type: constants.UPDATE_LOCATION,
        location
    };
}

export function getCurrnentLocation(dispatch) {
    const location = requestGeoLocation()
        .catch(api.identifyLocationByIp)
        .then(location => location.coords != null ? api.getCityByCoordinates(location.coords) : location)
        .catch(err => console.error('req err:', err))
    ;

    location.then(location =>
        setTimeout(() =>
            dispatch(getWeather(location)), 0));

    return {
        AWAIT_MARKER,
        type: constants.IDENTIFY_LOCATION,
        payload: {location}
    };
}

export function initialize() {
    return (dispatch) => {
        dispatch(getCurrnentLocation(dispatch));
    };
}

export function selectCard(index) {
    return {
        type: constants.SELECT_CARD,
        index
    };
}

export function changeLocation(locationIndex) {
    return (dispatch, getState) => {
        const location = getState().getIn(['data', 'locationSearch', locationIndex]);
        dispatch(updateLocation(location));
        dispatch(getWeather(location));
    }
}

export function locationChange(locationInput) {
    return {
        type: constants.LOCATION_INPUT_CHANGE,
        locationInput
    };
}