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
    render() {
        return <div className={block('container')}>
            <DetailedWeatherCard/>
            <DaysList cards={cards}/>
        </div>;
    }
}


/*
<div className={block('card')}>
    <div className={block('cardBody')}>

        <div className={block('icon')}>
            <Icon/>
        </div>
        <div className={block('temperature')}>-25°C</div>
        <div className={block('place')}>Saint-Petersburg</div>
        <div className={block('day')}>Today</div>
        <div className={block('weather')}>Clear</div>
        <div className={block('misc')}>
            <div>humidity 82%</div>
            <div>sunrise at 09:55</div>
            <div>sunset at 16:15</div>
        </div>
    </div>
</div>
*/
