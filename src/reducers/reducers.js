import {Map as IMap, fromJS} from 'immutable';
import { combineReducers } from 'redux-immutablejs';
//import { combineReducers } from 'redux';
import { reducer as awaitReducer } from 'redux-await';

import constants from '../actions/actions';

const initialState = fromJS({location: {}, weather: []});


function reducer (state = initialState, action = {}) {
    switch (action.type) {
        case constants.IDENTIFY_LOCATION:
            return state.set('location', action.payload.location);

        case constants.GET_WEATHER:
            return state
                .set('weather', action.payload.weather)
                .set('selectedCard', 0)
            ;

        case constants.SELECT_CARD:
            return state.set('selectedCard', action.index);
    }
    return state;
}

export default combineReducers({
    data: reducer,
    await: awaitReducer
})
