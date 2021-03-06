import { createAction } from 'redux-actions';
import axios from 'axios';
import uuid from 'uuid/v1';
import routes from '../routes';

export const addChanelAll = createAction('CHANEL_ADD_All');
export const addChanelRequest = createAction('CHANEL_ADD_REQUEST');
export const addChanelSuccess = createAction('CHANEL_ADD_SUCCESS');
export const addChanelFailure = createAction('CHANEL_ADD_FAILURE');
export const addChanelIo = createAction('CHANEL_ADD_IO');

export const editChanelRequest = createAction('CHANEL_EDIT_REQUEST');
export const editChanelSuccess = createAction('CHANEL_EDIT_SUCCESS');
export const editChanelFailure = createAction('CHANEL_EDIT_FAILURE');
export const editChanelIo = createAction('CHANEL_EDIT_IO');

export const delChanelRequest = createAction('CHANEL_DEL_REQUEST');
export const delChanelSuccess = createAction('CHANEL_DEL_SUCCESS');
export const delChanelFailure = createAction('CHANEL_DEL_FAILURE');
export const delChanelIo = createAction('CHANEL_DEL_IO');

export const setCurrentChanel = createAction('CHANEL_SET_CURRENT');

export const addMessageAll = createAction('MESSAGE_ADD_ALL');
export const addMessageIo = createAction('MESSAGE_ADD_IO');

export const addMessageUpdate = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');
export const messageDel = createAction('MESSAGE_DEL');

export const sendMessage = (channelId, { message }, userName, clientId) => async (dispatch) => {
  const attributes = {
    author: userName,
    body: message,
    channelId,
    clientId,
  };
  const localId = uuid();
  dispatch(addMessageUpdate({ ...attributes, localId }));
  try {
    await axios.post(
      routes.addMessageToChannelUrl(channelId),
      { data: { attributes } },
      { timeout: 5000 },
    );
    dispatch(addMessageSuccess(localId));
  } catch (e) {
    dispatch(addMessageFailure(localId));
  }
};

export const addChannel = name => async (dispatch) => {
  const attributes = { name };
  dispatch(addChanelRequest());
  try {
    await axios.post(
      routes.addChannelUrl(),
      { data: { attributes } },
      { timeout: 5000 },
    );
    dispatch(addChanelSuccess());
  } catch (e) {
    dispatch(addChanelFailure(e.message));
  }
};

export const editChannel = (name, id) => async (dispatch) => {
  const attributes = { name };
  dispatch(editChanelRequest());
  try {
    await axios.patch(
      routes.editChannelUrl(id),
      { data: { id, attributes } },
      { timeout: 5000 },
    );
    dispatch(editChanelSuccess());
  } catch (e) {
    dispatch(editChanelFailure(e.message));
  }
};

export const delChannel = id => async (dispatch) => {
  dispatch(delChanelRequest());
  try {
    await axios.delete(
      routes.editChannelUrl(id),
      { data: { id } },
      { timeout: 5000 },
    );
    dispatch(delChanelSuccess());
  } catch (e) {
    dispatch(delChanelFailure(e.message));
  }
};
