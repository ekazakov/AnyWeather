import React, {Component} from 'react';
import Icon from './Icon';
import ShowIf from './ShowIf';
import _b from 'bem-cn';
import dateFormat from 'dateformat';
import * as actions from '../actions/actions';


const block = _b('DetailedWeatherCard');

function isDayTime(date, sunrise, sunset) {
    return date.valueOf() >= sunrise.valueOf() && date.valueOf() <= sunset.valueOf();
}

export default class DetailedWeatherCard extends Component {
    onLocationChange(event) {
        this.props.dispatch(actions.changeLocation(event.target.value))
    }

    renderToday() {
        const {abs, round} = Math;
        const {weather} = this.props;

        const date = new Date(weather.getIn(['today', 'date']) * 1000);
        const sunrise = new Date(weather.getIn(['today', 'sunrise']) * 1000);
        const sunset = new Date(weather.getIn(['today', 'sunset']) * 1000);
        const isDay = isDayTime(date, sunrise, sunset);

        return <div>
            <div className={block('date')}>Today, {dateFormat(date, 'dd mmm yy')}</div>

            <div className={block('temperatureCard')}>
                <Icon className={block('weatherIcon')} conditionId={weather.getIn(['today', 'condition', 'id'])}
                      isDay={isDay}/>
                <div className={block('weather')}>{weather.getIn(['today', 'condition', 'main'])}</div>
                <div className={block('temperature', {minus: weather.getIn(['today', 'curTemp']) < 0})}>
                    {abs(round(weather.getIn(['today', 'curTemp'])))}
                    <span className={block('degreeSign')}>°C</span>
                </div>
            </div>
            <div className={block('miscInfo')}>
                <div>humidity {weather.getIn(['today', 'humidity'])}%</div>
                <div><Icon className={block('sunriseIcon')} name="sunRise"/> sunrise at {dateFormat(sunrise, 'HH:MM')}
                </div>
                <div><Icon className={block('sunsetIcon')} name="sunSet"/> sunset at {dateFormat(sunset, 'HH:MM')}</div>
            </div>
        </div>
    }

    renderForecastDay() {
        const {abs, round} = Math;
        const {weather, selectedCard} = this.props;
        const card = weather.getIn(['forecast', selectedCard]);

        const date = new Date(card.get('date') * 1000);
        const sunrise = new Date(card.get('sunrise'));
        const sunset = new Date(card.get('sunset'));

        return <div>
            <div className={block('date')}>{dateFormat(date, 'dddd, dd mmm yy')}</div>

            <div className={block('temperatureCard')}>
                <Icon className={block('weatherIcon')} conditionId={card.getIn(['condition', 'id'])} isDay={true}/>
                <div className={block('weather')}>{card.getIn(['condition', 'main'])}</div>
                <div className={block('temperature', {minus: card.get('dayTemp') < 0})}>
                    {abs(round(card.get('dayTemp')))}
                    <span className={block('degreeSign')}>°C</span>
                </div>
            </div>
            <div className={block('miscInfo')}>
                <div>humidity {card.get('humidity')}%</div>
                <div>
                    <Icon className={block('sunriseIcon')} name="sunRise"/> sunrise at {dateFormat(sunrise, 'HH:MM')}
                </div>
                <div>
                    <Icon className={block('sunsetIcon')} name="sunSet"/> sunset at {dateFormat(sunset, 'HH:MM')}
                </div>
            </div>
        </div>;
    }

    render() {
        const {weather, location, selectedCard, locationSearch} = this.props;

        return <div className={block()}>
            <div className={block('place')}>
                <button className={block('placeButton')}>
                    {location.get('city')}, {location.get('country')}
                    <Icon name="chevron" className={block('chevron')}/>
                </button>
                <select onChange={this.onLocationChange.bind(this)}>
                    {locationSearch.map((loc, index) =>
                        <option value={index} key={index}>{loc.get('city')}, {loc.get('country')}</option>)}
                </select>
            </div>
            <ShowIf predicate={selectedCard === 0}>{this.renderToday()}</ShowIf>
            <ShowIf predicate={selectedCard !== 0}>{this.renderForecastDay()}</ShowIf>
        </div>;
    }
}