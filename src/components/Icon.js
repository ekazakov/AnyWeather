import React from 'react';
import iconByCodeAndDay, * as icons from './Icons';

export default (props) => {
    const {name, styles, conditionId, isDay,...restProps} = props;
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

    const iconName = (id, isDay) => name || iconByCodeAndDay(id, isDay);

    //console.log('icon name', name || iconName(conditionId, isDay));
    const {component: IconComponent, viewBox} = icons[iconName(conditionId, isDay)];

    if (viewBox) {
        svgDefaultParams.viewBox = viewBox;
    }

    return <svg {...svgDefaultParams} style={resultStyles} {...restProps}>
        <IconComponent/>
    </svg>;
}

