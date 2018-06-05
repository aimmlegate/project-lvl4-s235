import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { omit } from 'lodash';
import * as actions from '../actions';

const defaultState = {};

const channels = handleActions(
  {
    [actions.addChanel](state, { payload: payloadedChannels }) {
      const channelEntities = payloadedChannels.reduce(
        (acc, channel) => ({ ...acc, [channel.id]: channel }),
        {}
      );
      return { ...state, ...channelEntities };
    },
  },
  defaultState
);

const messages = handleActions(
  {
    [actions.addMessageAll](state, { payload: payloadedMessages }) {
      const msgEntities = payloadedMessages.reduce(
        (acc, message) => ({ ...acc, [message.id]: message }),
        {}
      );
      const msgIds = Object.keys(msgEntities);

      return {
        ...state,
        byId: msgEntities,
        allIds: msgIds,
      };
    },
    [actions.addMessageIo](state, { payload: payloadedMessage }) {
      const { id } = payloadedMessage;
      const { byId, allIds } = state;
      const msgEntities = { ...byId, [id]: payloadedMessage };
      const msgIds = [...allIds, id.toString()];

      return {
        ...state,
        byId: msgEntities,
        allIds: msgIds,
      };
    },
    [actions.addMessageUpdate](state, { payload: payloadedMessage }) {
      const { localId } = payloadedMessage;
      const { byId, allIds } = state;
      const messageWithStatus = { ...payloadedMessage, status: 'pending' };
      const msgEntities = { ...byId, [localId]: messageWithStatus };
      const msgIds = [...allIds, localId];

      return {
        ...state,
        byId: msgEntities,
        allIds: msgIds,
      };
    },
    [actions.addMessageSuccess](state, { payload: localMsgId }) {
      const { byId, allIds } = state;
      const RemovedLocalMessage = omit(byId, localMsgId);
      const RemovedLocalMessageId = allIds.filter(id => !(id === localMsgId));

      return {
        ...state,
        byId: RemovedLocalMessage,
        allIds: RemovedLocalMessageId,
      };
    },
    [actions.addMessageFailure](state, { payload: localMsgId }) {
      const message = state.byId[localMsgId];
      const messageWithStatus = { ...message, status: 'error' };
      const msgEntities = { ...state.byId, [localMsgId]: messageWithStatus };
      return { ...state, byId: msgEntities };
    },
  },
  defaultState
);

export default combineReducers({
  form: formReducer,
  channels,
  messages,
});
