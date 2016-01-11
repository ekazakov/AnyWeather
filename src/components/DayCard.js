import React, {Component} from 'react';
import Icon from './Icon';
import _b from 'bem-cn';

const block = _b('DayCard');

export default class DayCard extends Component {
    render() {
        const {day, icon, nightTemperature, dayTemperature, weather} = this.props.card.toJS();
        return <div className={block()}>
            <Icon className={block('weatherIcon')} name={icon}/>
            <div className={block('day')}>{day}</div>
            <div className={block('weather')}>{weather}</div>
            <div className={block('temperature')}></div>
            <div className={block('dayTemperature', {minus: true})}>
                {Math.abs(dayTemperature)}°
                <span className={block('nightTemperature')}>{nightTemperature}°</span>
            </div>
        </div>;
    }
}