import React, {Component} from 'react';
import Icon from './Icon';
import _b from 'bem-cn';

const block = _b('DetailedWeatherCard');

export default class DetailedWeatherCard extends Component {
    render() {
        return <div className={block()}>
            <div className={block('place')}>Saint-Petersburg, Russia</div>
            <div className={block('date')}>Today, 26 Jan 16</div>

            <div className={block('temperatureCard')}>
                <Icon className={block('weatherIcon')} name="sun"/>
                <div className={block('weather')}>clear</div>
                <div className={block('temperature', {minus: true})}>
                    24
                    <span className={block('degreeSign')}>°C</span>
                </div>
            </div>
            <div className={block('miscInfo')}>
                <div>humidity 82%</div>
                <div><Icon className={block('sunriseIcon')} name="sunRise"/> sunrise at 09:55</div>
                <div><Icon className={block('sunsetIcon')} name="sunSet"/> sunset at 16:15</div>
            </div>
        </div>;
    }
}