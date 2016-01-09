const consants = {
    SIMPLE_ASYNC_START: 'SIMPLE_ASYNC_START',
    SIMPLE_ASYNC_FAIL: 'SIMPLE_ASYNC_FAIL',
    SIMPLE_ASYNC_SUCCESS: 'SIMPLE_ASYNC_SUCCESS',

    SEQUENCE_ASYNC_START: 'SEQUENCE_ASYNC_START',
    SEQUENCE_ASYNC_STEP: 'SEQUENCE_ASYNC_STEP',
    SEQUENCE_ASYNC_FAIL: 'SEQUENCE_ASYNC_FAIL',
    SEQUENCE_ASYNC_SUCCESS: 'SEQUENCE_ASYNC_SUCCESS',
};

function delay(time) {
    return new Promise(resolver => setTimeout(resolver, time));
}

export default consants;

function simpleAsyncStart() {
    return {type: consants.SIMPLE_ASYNC_START};
}

function simpleAsyncSuccess(counter) {
    return {type: consants.SIMPLE_ASYNC_SUCCESS, counter};
}



export function simpleAsync(counter) {
    return (dispatch, getState) => {
        const counter = getState().getIn(['simple', 'counter']);
        dispatch(simpleAsyncStart());
        return delay(1000).then(() => dispatch(simpleAsyncSuccess(counter + 1)))
    };

    //return simpleAsyncSuccess(counter + 1)
}

function seqAsyncStart() {
    return {type: consants.SEQUENCE_ASYNC_START};
}

function seqAsyncStep(time) {
    return (dispatch, getState) => {
        return delay(time).then(() => dispatch({
            type: consants.SEQUENCE_ASYNC_STEP,
            counter: getState().getIn(['seq', 'counter']) + 1
        }));
    };
}

function seqAsyncSuccess() {
    return {type: consants.SEQUENCE_ASYNC_SUCCESS};
}

export function seqAsync() {
    return (dispatch) => {
        dispatch(seqAsyncStart());

        return Promise.all([
            dispatch(seqAsyncStep(1000)),
            dispatch(seqAsyncStep(2000)),
            dispatch(seqAsyncStep(3000)),
            dispatch(seqAsyncStep(4000))
        ]).then(() => seqAsyncSuccess());

    };
}