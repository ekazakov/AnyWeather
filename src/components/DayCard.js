import React, {Component} from 'react';
import momemnt from 'moment';
import Icon from './Icon';
import _b from 'bem-cn';

import * as actions from '../actions/actions';

const block = _b('DayCard');

export default class DayCard extends Component {
    selectCard(index) {
        this.props.dispatch(actions.selectCard(index));
    }

    render() {
        const {selected, index} = this.props;
        const {date, nightTemp, dayTemp, condition, pressure, humidity, speed, isToday} = this.props.card.toJS();
        const {abs, round} = Math;

        return <div className={`${block()} ${block({selected})}`} onClick={()=> this.selectCard(index)}>
            <Icon className={block('weatherIcon')} conditionId={condition.id} isDay={true}/>
            <div className={block('day')}>{momemnt(date*1000).format('MMM DD')}</div>
            <div className={block('weather')}>{condition.description}</div>
            <div className={block('temperature')}></div>
            <div className={block('dayTemperature', {minus: dayTemp < 0})}>
                {abs(round(dayTemp))}°
                <span className={block('nightTemperature')}>{round(nightTemp)}°</span>
            </div>
        </div>;
    }
}