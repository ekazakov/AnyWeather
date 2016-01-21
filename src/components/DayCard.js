import React, {Component} from 'react';
import Icon from './Icon';
import _b from 'bem-cn';

const block = _b('DayCard');

export default class DayCard extends Component {
    render() {
        const {date, nightTemp, dayTemp, condition, pressure, humidity, speed, isToday} = this.props.card.toJS();
        const {abs, round} = Math;

        return <div className={block()}>
            <Icon className={block('weatherIcon')} conditionId={condition.id}/>
            <div className={block('day')}>{date}</div>
            <div className={block('weather')}>{condition.description}</div>
            <div className={block('temperature')}></div>
            <div className={block('dayTemperature', {minus: dayTemp < 0})}>
                {abs(round(dayTemp))}°
                <span className={block('nightTemperature')}>{round(nightTemp)}°</span>
            </div>
        </div>;
    }
}