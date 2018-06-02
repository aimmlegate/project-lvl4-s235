import ReactDOM from 'react-dom';
import React from 'react';
import faker from 'faker';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Main from './components/Main.jsx';
import reducers from './reducers';
import setStartState from './helpers';
import * as actionCreators from './actions';

const { channels, messages } = window.gon;
const socket = io();
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

socket.on('newMessage', ( { data : { attributes : message } }) => {  
  store.dispatch(actionCreators.addMessage(message));
});

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('chat'),
);