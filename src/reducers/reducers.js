import {Map as IMap, fromJS} from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import constants from '../actions/actions';

const initialState = fromJS({});


export default function (state = initialState, action) {
    return state;
};

