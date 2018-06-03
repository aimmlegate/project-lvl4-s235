import { reducer as formReducer } from "redux-form";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
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
      return [ ...state, ...payloadedMessages ];
    },
    [actions.addMessage](state, { payload: payloadedMessage }) {
      return [ ...state, payloadedMessage ];
    },
    [actions.preRenderMessage](state, { payload: payloadedMessage }) {
      const messageWithStatus = { ...payloadedMessage, status: "pending" };
      return [ ...state, messageWithStatus ];
    },
    [actions.completeSendMessage](state, { payload: localMsgId }) {
      const RemoveLocalMessage = state.filter((msg) => !(msg.localId === localMsgId));
      return [ ...RemoveLocalMessage ];
    },
    [actions.errorSendMessage](state, { payload: localMsgId }) {
      const [message] = state.filter((msg) => (msg.localId === localMsgId));
      const RemoveMessage = state.filter((msg) => !(msg.localId === localMsgId));
      const messageWithStatus = { ...message, status: "error" };
      return [ ...RemoveMessage, messageWithStatus ];
    }
  },
  []
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
