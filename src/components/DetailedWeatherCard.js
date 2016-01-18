import React, {Component} from 'react';
import Icon from './Icon';
import _b from 'bem-cn';
import dateFormat from 'dateformat';

const block = _b('DetailedWeatherCard');

export default class DetailedWeatherCard extends Component {
    render() {
        const {weather, location} = this.props;
        const today = new Date(weather.get('date')*1000);
        return <div className={block()}>
            <div className={block('place')}>{location.get('city')}, {location.get('country')}</div>
            <div className={block('date')}>Today, {dateFormat(today, 'dd mmm yy')}</div>

            <div className={block('temperatureCard')}>
                <Icon className={block('weatherIcon')} name="sun"/>
                <div className={block('weather')}>{weather.getIn(['sky', 'main'])}</div>
                <div className={block('temperature', {minus: weather.get('curTemp') < 0})}>
                    {Math.abs(weather.get('curTemp'))}
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