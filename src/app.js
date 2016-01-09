import React, { Component } from 'react';

/* global styles for app */
import './styles/app.scss';
import * as actions from './actions/actions';
import _b from 'bem-cn';

const block = _b('App');

class Icon extends Component {
    render() {
        const svgParams = {
            version: "1.1",
            x: "0px",
            y: "0px",
            viewBox: "0 0 91 91",
            preserveAspectRatio: "xMidYMid meet",
            fit: "true",
        };

        const styles = {
            fill: '#fff',
        };

        return <svg {...svgParams} style={styles} >
            <g>
                <path d="M45.5,23.5c-12.1,0-22,9.9-22,22c0,12.1,9.9,22,22,22c12.1,0,22-9.9,22-22C67.5,33.4,57.6,23.5,45.5,23.5z M45.5,59.5 c-7.7,0-14-6.3-14-14c0-7.7,6.3-14,14-14c7.7,0,14,6.3,14,14C59.5,53.2,53.2,59.5,45.5,59.5z"/>
                <path d="M45.5,16.2c2.2,0,4-1.8,4-4V4.1c0-2.2-1.8-4-4-4c-2.2,0-4,1.8-4,4v8.1C41.5,14.5,43.3,16.2,45.5,16.2z"/>
                <path d="M86.9,41.5h-8.1c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4h8.1c2.2,0,4-1.8,4-4C90.9,43.3,89.1,41.5,86.9,41.5z"/>
                <path d="M45.5,74.8c-2.2,0-4,1.8-4,4v8.1c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4v-8.1C49.5,76.5,47.7,74.8,45.5,74.8z"/>
                <path d="M16.2,45.5c0-2.2-1.8-4-4-4H4.1c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4h8.1C14.5,49.5,16.2,47.7,16.2,45.5z"/>
                <path d="M69,26c1,0,2-0.4,2.8-1.2l5.8-5.8c1.6-1.6,1.6-4.1,0-5.7c-1.6-1.6-4.1-1.6-5.7,0l-5.8,5.8c-1.6,1.6-1.6,4.1,0,5.7 C67,25.6,68,26,69,26z"/>
                <path d="M71.8,66.2c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.1,0,5.7l5.8,5.8c0.8,0.8,1.8,1.2,2.8,1.2c1,0,2-0.4,2.8-1.2 c1.6-1.6,1.6-4.1,0-5.7L71.8,66.2z"/>
                <path d="M19.2,66.2l-5.8,5.8c-1.6,1.6-1.6,4.1,0,5.7c0.8,0.8,1.8,1.2,2.8,1.2c1,0,2-0.4,2.8-1.2l5.8-5.8c1.6-1.6,1.6-4.1,0-5.7 C23.3,64.6,20.7,64.6,19.2,66.2z"/>
                <path d="M19.2,24.8C19.9,25.6,21,26,22,26c1,0,2-0.4,2.8-1.2c1.6-1.6,1.6-4.1,0-5.7l-5.8-5.8c-1.6-1.6-4.1-1.6-5.7,0 c-1.6,1.6-1.6,4.1,0,5.7L19.2,24.8z"/>
            </g>
        </svg>;
    }
}

export class App extends Component {
    render() {
        return <div className={block('container')}>
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
        </div>;
    }
}