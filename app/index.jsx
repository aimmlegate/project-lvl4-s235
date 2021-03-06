import ReactDOM from 'react-dom';
import React from 'react';
import faker from 'faker';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import uuid from 'uuid/v1';
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
const clientId = uuid();
const isClientId = () => Cookies.get('aiml-chat-client-id');
const isCookieName = () => Cookies.get('aiml-chat-username');

if (!isCookieName()) {
  Cookies.set('aiml-chat-username', fakeName);
}

if (!isClientId()) {
  Cookies.set('aiml-chat-client-id', clientId);
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

setStartState(store, channels, messages);

socket.on('newMessage', ({ data: { attributes: message } }) => {
  const payload = { message, localID: Cookies.get('aiml-chat-client-id') };
  store.dispatch(actionCreators.addMessageIo(payload));
});
socket.on('renameChannel', ({ data: { attributes: channel } }) => {
  store.dispatch(actionCreators.editChanelIo(channel));
});
socket.on('removeChannel', ({ data: { id: channelId } }) => {
  store.dispatch(actionCreators.delChanelIo(channelId));
});
socket.on('newChannel', ({ data: { attributes } }) => {
  store.dispatch(actionCreators.addChanelIo(attributes));
});


export default React.createContext();

ReactDOM.render(
  <Provider store={store}>
    <Main
      userName={Cookies.get('aiml-chat-username')}
      clientId={Cookies.get('aiml-chat-client-id')}
    />
  </Provider>,
  document.getElementById('chat'),
);
