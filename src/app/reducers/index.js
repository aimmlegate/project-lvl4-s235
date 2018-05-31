import { reducer as formReducer } from "redux-form";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import * as actions from "../actions";

const defaultState = {};

const channels = handleActions(
  {
    [actions.addChanel](
      state,
      {
        payload: payloadedChannels
      }
    ) {
      const formatedChannels = payloadedChannels.map((channel) => ({ [channel.id]: channel }));
      const unionNewChanels = Object.assign({}, ...formatedChannels);
      return { ...state, ...unionNewChanels };
    }
  },
  defaultState
);

const messages = handleActions(
  {
    [actions.addMessage](
      state,
      {
        payload: payloadedMessages
      }
    ) {
      const formatedMessages = payloadedMessages.map((message) => ({ [message.id]: message }));
      const unionNewMessages = Object.assign({}, ...formatedMessages);
      return { ...state, ...unionNewMessages };
    }
  },
  defaultState
);

const userName = handleActions(
  {
    [actions.setUsername](
      state,
      {
        payload: payloadedUsername
      }
    ) {
      return payloadedUsername;
    }
  },
  defaultState
);

export default combineReducers({
  form: formReducer,
  channels,
  messages,
  userName,
});
