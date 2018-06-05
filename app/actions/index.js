import { createAction } from 'redux-actions';
import axios from 'axios';
import uuid from 'uuid/v1';
import routes from '../routes';

export const addChanel = createAction('CHANEL_ADD');
export const addMessageAll = createAction('MESSAGE_ALL_ADD');
export const addMessage = createAction('MESSAGE_ADD');
export const preRenderMessage = createAction('PRE_RENDER_MESSAGE');
export const completeSendMessage = createAction('COMPLETE_SEND_MESSAGE');
export const errorSendMessage = createAction('ERROR_SEND_MESSAGE');

export const sendMessage = (channelId, { message }, userName, clientId) => async dispatch => {
  const attributes = { author: userName, body: message, channelId, clientId };
  const localId = uuid();
  dispatch(preRenderMessage({ ...attributes, localId }));
  try {
    await axios.post(
      routes.addMessageToChannelUrl(channelId),
      { data: { attributes } },
      { timeout: 5000 }
    );
    dispatch(completeSendMessage(localId));
  } catch (e) {
    console.error(e);
    dispatch(errorSendMessage(localId));
  }
};
