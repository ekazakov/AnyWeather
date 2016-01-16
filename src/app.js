/* global styles for app */
import './styles/app.scss';

import React, { Component } from 'react';
import * as actions from './actions/actions';
import _b from 'bem-cn';
import {Map as IMap, fromJS} from 'immutable';

import DetailedWeatherCard from './components/DetailedWeatherCard';
import DaysList from './components/DaysList';

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
        icon: 'sun',
        nightTemperature: -20,
        dayTemperature: -23,
        weather: 'clear'
    }
]);

export class App extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(actions.fooo());
    }

    render() {
        console.log('redner', this.props);
        return <div className={block('container')}>
            <DetailedWeatherCard/>
            <DaysList cards={cards}/>
        </div>;
    }
}

