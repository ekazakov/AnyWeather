import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as awaitMiddleware } from 'redux-await';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/reducers';


const logger = createLogger(
    {
        collapsed: true,
        predicate: (getState, action) => process.env.NODE_ENV === `development`,
    }
);

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    awaitMiddleware,
    logger
)(createStore);


export default function configureStore() {
    const store = createStoreWithMiddleware(rootReducer);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers/reducers', () => {
        const nextRootReducer = require('./reducers/reducers');
        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
}
