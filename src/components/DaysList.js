import React, {Component} from 'react';
import _b from 'bem-cn';

const block = _b('DaysList');

export default class DaysList extends Component {
    render() {
        return <div className={block()}>
            <div className={block('separator')}></div>
            <div className={block('selectedDayPointer')}></div>
            <div className={block('items')}></div>
        </div>;
    }
}