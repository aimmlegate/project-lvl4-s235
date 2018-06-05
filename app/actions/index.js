import { createAction } from 'redux-actions';
import axios from 'axios';
import uuid from 'uuid/v1';
import routes from '../routes';

export const addChanel = createAction('CHANEL_ADD');
export const addMessageAll = createAction('MESSAGE_ADD_ALL');
export const addMessageIo = createAction('MESSAGE_ADD_IO');
export const addMessageUpdate = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const sendMessage = (channelId, { message }, userName, clientId) => async dispatch => {
  const attributes = { author: userName, body: message, channelId, clientId };
  const localId = uuid();
  dispatch(addMessageUpdate({ ...attributes, localId }));
  try {
    await axios.post(
      routes.addMessageToChannelUrl(channelId),
      { data: { attributes } },
      { timeout: 5000 }
    );
    dispatch(addMessageSuccess(localId));
  } catch (e) {
    console.error(e);
    dispatch(addMessageFailure(localId));
  }
};
