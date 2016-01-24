/* global styles for app */
import './styles/app.scss';

import React, { Component } from 'react';
import * as actions from './actions/actions';
import _b from 'bem-cn';
import {Map as IMap, fromJS} from 'immutable';

import DetailedWeatherCard from './components/DetailedWeatherCard';
import DaysList from './components/DaysList';
import Preloader from './components/Preloader';

const block = _b('App');

export class App extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(actions.initialize());
    }

    render() {
        const {weather, location, errors, statuses, ...restProps} = this.props;

        if (statuses.location !== 'success' || statuses.weather !== 'success') {
            return <div className={block('container')}>
                <Preloader/>
            </div>
        }

        return <div className={block('container')}>
            <DetailedWeatherCard weather={weather} location={location} {...restProps}/>
            <DaysList cards={weather.get('forecast')} {...restProps}/>
        </div>;
    }
}

