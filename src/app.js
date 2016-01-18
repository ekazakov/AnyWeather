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

const cards = fromJS([
    {
        day: 'Mon, 26',
        icon: 'cloudsSun',
        nightTemperature: -25,
        dayTemperature: -30,
        weather: 'cloudy'
    },
    {
        day: 'Tue, 27',
        icon: 'cloudsSun',
        nightTemperature: -20,
        dayTemperature: -23,
        weather: 'cloudy'
    },
    {
        day: 'Wen, 28',
        icon: 'cloudSnowSun',
        nightTemperature: -20,
        dayTemperature: -23,
        weather: 'hail snow'
    },
    {
        day: 'Thu, 29',
        icon: 'cloudSnowSun',
        nightTemperature: -20,
        dayTemperature: -23,
        weather: 'hail snow'
    },
    {
        day: 'Fri, 30',
        icon: 'clearSkyDay',
        nightTemperature: -20,
        dayTemperature: -23,
        weather: 'clear'
    }
]);

export class App extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(actions.initialize());
    }

    render() {
        const {weather, location, errors, statuses} = this.props;

        if (statuses.location !== 'success' || statuses.weather !== 'success') {
            return <div className={block('container')}>
                <Preloader/>
            </div>
        }

        return <div className={block('container')}>
            <DetailedWeatherCard weather={weather.get(0)} location={location}/>
            <DaysList cards={cards}/>
        </div>;
    }
}

