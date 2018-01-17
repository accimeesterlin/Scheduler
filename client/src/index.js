import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import App from './App';

const middleware = applyMiddleware(promise(), logger);

const store = createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById('root'));
