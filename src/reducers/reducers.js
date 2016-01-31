import {Map as IMap, fromJS} from 'immutable';
import { combineReducers } from 'redux-immutablejs';
//import { combineReducers } from 'redux';
import { reducer as awaitReducer } from 'redux-await';

import constants from '../actions/actions';

const locationSearch = [
    { city: 'Saint Petersburg', country: 'Russia', latitude: 59.972933, longitude: 30.392719},
    { city: 'Moscow', country: 'Russia', latitude: 55.7522200, longitude: 37.6155600},
    { city: 'San Francisco', country: 'USA', latitude: 37.783333, longitude: -122.416667},
    { city: 'London', country: 'UK', latitude: 51.5085300, longitude: -0.1257400},
    { city: 'Berlin', country: 'Germany', latitude: 52.5243700, longitude: 13.4105300}
];

const initialState = fromJS({
    location: {},
    weather: {},
    locationSearch,
    locationInput: ''
});

function locationToString(location) {
    return `${location.get('city')}, ${location.get('country')}`;
}

function reducer (state = initialState, action = {}) {
    switch (action.type) {
        case constants.IDENTIFY_LOCATION:
            return state
                .set('location', action.payload.location)
                .set('locationInput', locationToString(action.payload.location))
            ;

        case constants.GET_WEATHER:
            return state
                .set('weather', action.payload.weather)
                .set('selectedCard', 0)
            ;

        case constants.SELECT_CARD:
            return state.set('selectedCard', action.index);

        case constants.LOCATION_INPUT_CHANGE:
            return state.set('locationInput', action.locationInput);

        case constants.UPDATE_LOCATION:
            return state
                .set('location', action.location)
                .set('locationInput', locationToString(action.location))
            ;
    }

    return state;
}

export default combineReducers({
    data: reducer,
    await: awaitReducer
})
