import { createAction } from "redux-actions";
import axios from "axios";

export const addChanel = createAction("CHANEL_ADD");
export const addMessageAll = createAction("MESSAGE_ALL_ADD");
export const addMessage = createAction("MESSAGE_ADD");
export const setUsername = createAction("SET_USERNAME");
export const startSendMessage = createAction("START_SEND_MESSAGE");
export const completeSendMessage = createAction("COMPLETE_SEND_MESSAGE");
export const errorSendMessage = createAction("ERROR_SEND_MESSAGE");

export const sendMessage = (channelId, { message }, userName) => async dispatch => {
  dispatch(startSendMessage());
  const attributes = { author: userName, body: message, channelId };
  try {
    await axios.post(
      "api/v1/channels/1/messages",
      { data: { attributes } },
      { timeout: 5000 }
    );
    dispatch(completeSendMessage());
  } catch (e) {
    dispatch(errorSendMessage());
  }
};
