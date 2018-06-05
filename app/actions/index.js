import { createAction } from 'redux-actions';
import axios from 'axios';
import uuid from 'uuid/v1';

export const addChanel = createAction('CHANEL_ADD');
export const addMessageAll = createAction('MESSAGE_ALL_ADD');
export const addMessage = createAction('MESSAGE_ADD');
export const setUsername = createAction('SET_USERNAME');
export const setClientId = createAction('SET_CLIENT_ID');
export const preRenderMessage = createAction('PRE_RENDER_MESSAGE');
export const completeSendMessage = createAction('COMPLETE_SEND_MESSAGE');
export const errorSendMessage = createAction('ERROR_SEND_MESSAGE');

export const sendMessage = (channelId, { message }, userName, clientId) => async dispatch => {
  const attributes = { author: userName, body: message, channelId, clientId };
  const localId = uuid();
  dispatch(preRenderMessage({ ...attributes, localId }));
  try {
    await axios.post(
      `api/v1/channels/${channelId}/messages`,
      { data: { attributes } },
      { timeout: 5000 }
    );
    dispatch(completeSendMessage(localId));
  } catch (e) {
    dispatch(errorSendMessage(localId));
  }
};
