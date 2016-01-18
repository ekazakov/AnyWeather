import React from 'react';
import Icon from './Icon';
import _b from 'bem-cn';

const block = _b('Preloader');

const Preloader = (props) => {
    return <div className={block()}>
        <Icon name="sun" className={block('icon')}/>
    </div>;
};

export default Preloader;