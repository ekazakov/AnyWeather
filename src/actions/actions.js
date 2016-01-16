import { AWAIT_MARKER } from 'redux-await';

const constants = {
    FOO: '@@any-weather/FOO',
};

function delay(time) {
    return new Promise(resolver => setTimeout(resolver, time));
}

export default constants;

export function fooo() {
    return {
        type: constants.FOO,
        AWAIT_MARKER,
        payload: {
            fooo: delay(3000).then(() => {
                console.log('action resolved');
                return [1, 2, 3];
            })
        }
    };
}