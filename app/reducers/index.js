import { reducer as formReducer } from "redux-form";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { omit } from "lodash";
import * as actions from "../actions";

const defaultState = {};

const channels = handleActions(
  {
    [actions.addChanel](state, { payload: payloadedChannels }) {
      const formatedChannels = payloadedChannels.map(channel => ({
        [channel.id]: channel
      }));
      const unionNewChanels = Object.assign({}, ...formatedChannels);
      return { ...state, ...unionNewChanels };
    }
  },
  defaultState
);

const messages = handleActions(
  {
    [actions.addMessageAll](state, { payload: payloadedMessages }) {
      const formatedMessages = payloadedMessages.map(message => ({
        [message.id]: message
      }));
      const unionNewMessages = Object.assign({}, ...formatedMessages);
      return { ...state, ...unionNewMessages };
    },
    [actions.addMessage](state, { payload: payloadedMessage }) {
      const { id } = payloadedMessage;
      return { ...state, [id]: payloadedMessage };
    },
    [actions.preRenderMessage](state, { payload: payloadedMessage }) {
      const { localId } = payloadedMessage;
      const messageWithStatus = { ...payloadedMessage, status: "pending" };
      return { ...state, [localId]: messageWithStatus };
    },
    [actions.completeSendMessage](state, { payload: localMsgId }) {
      const RemoveLocalMessage = omit(state, localMsgId);
      return { ...RemoveLocalMessage };
    },
    [actions.errorSendMessage](state, { payload: localMsgId }) {
      const message = state[localMsgId];
      const messageWithStatus = { ...message, status: "error" };
      return { ...state, [localMsgId]: messageWithStatus };
    }
  },
  defaultState
);

const userName = handleActions(
  {
    [actions.setUsername](state, { payload: payloadedUsername }) {
      return payloadedUsername;
    }
  },
  defaultState
);

const clientId = handleActions(
  {
    [actions.setClientId](state, { payload: payloadedId }) {
      return payloadedId;
    }
  },
  defaultState
);

export default combineReducers({
  form: formReducer,
  channels,
  messages,
  userName,
  clientId
});
