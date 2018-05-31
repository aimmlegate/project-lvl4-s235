import ReactDOM from 'react-dom';
import React from 'react';
import faker from 'faker';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Main from './components/Main.jsx';
import reducers from './reducers';
import setStartState from './helpers';

const { channels, messages } = window.gon;

const fakeName = faker.name.findName();
const isCookieName = () => Cookies.get('username');

if (!isCookieName()) {
  Cookies.set('username', fakeName);
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

setStartState(store, channels, messages, Cookies.get('username'));

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('chat'),
);