import {Map as IMap, fromJS} from 'immutable';
import { combineReducers } from 'redux-immutablejs';
//import { combineReducers } from 'redux';
import { reducer as awaitReducer } from 'redux-await';

import constants from '../actions/actions';

const initialState = fromJS({data: {x: 1}});


function reducer (state = initialState, action = {}) {
    console.log('reducer', state.toJS());
    return state;
}

export default combineReducers({
    data: reducer,
    await: awaitReducer
})
