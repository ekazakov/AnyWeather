import React from 'react';
import * as icons from './Icons';

const svgGroup = (props) => {

};

export default (props) => {
    const {name, styles,...restProps} = props;
    const svgDefaultParams = {
        version: "1.1",
        x: "0px",
        y: "0px",
        viewBox: "0 0 91 91",
        preserveAspectRatio: "xMidYMid meet",
        fit: "true",
    };

    const resultStyles = Object.assign({
        fill: '#fff'
    }, styles);

    //console.log('icon name', name);
    const {component: IconComponent, viewBox} = icons[name];

    if (viewBox) {
        svgDefaultParams.viewBox = viewBox;
    }

    return <svg {...svgDefaultParams} style={resultStyles} {...restProps}>
        <IconComponent/>
    </svg>;
}

