import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect as reduxConnect } from 'react-redux';
import { connect as awaitConnect } from 'redux-await';
import configureStore from './store';
import {App} from './app';
const store = configureStore();


const mapStateToProps = state => {
    return state.data.toObject();
};

const connect = (mapStateToProps, ...args) =>
    reduxConnect(state => {
        state = state.toObject();
        const props = mapStateToProps(state);
        const {statuses, errors} = state.await;
        return {...props, statuses, errors};
    });

const AppContainer = connect(mapStateToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.getElementById('root')
);
