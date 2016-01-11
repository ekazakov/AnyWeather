import React, {Component} from 'react';
import DayCard from './DayCard';
import _b from 'bem-cn';

const block = _b('DaysList');

export default class DaysList extends Component {
    render() {
        const {cards} = this.props;
        return <div className={block()}>
            <div className={block('separator')}></div>
            <div className={block('cardsContainer')}>
                <div className={block('selectedDayPointer')}></div>
                <div className={block('cards')}>
                    {cards.map((card, index) => <DayCard card={card} key={index}/>).toJS()}
                </div>
            </div>
        </div>;
    }
}