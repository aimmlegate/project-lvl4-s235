import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { omit, keyBy } from 'lodash';
import * as actions from '../actions';

const defaultState = {};
const defaultChannelsState = { current: '1' };

const channels = handleActions(
  {
    [actions.addChanelAll](state, { payload: payloadedChannels }) {
      const channelsEntities = keyBy(payloadedChannels, 'id');
      const channelsIds = Object.keys(channelsEntities);

      return {
        ...state,
        byId: channelsEntities,
        allIds: channelsIds,
      };
    },
    [actions.addChanelSuccess](state, { payload: payloadedChannel }) {
      const { id } = payloadedChannel;
      const channelsEntities = { ...state.byId, [id]: payloadedChannel };
      const channelsIds = Object.keys(channelsEntities);

      return {
        ...state,
        byId: channelsEntities,
        allIds: channelsIds,
      };
    },
    [actions.setCurrentChanel](state, { payload: payloadedCurrentId }) {
      return { ...state, current: payloadedCurrentId };
    },
    [actions.editChanelIo](state, { payload: payloadedChannel }) {
      const { id } = payloadedChannel;
      const channelsEntities = { ...state.byId, [id]: payloadedChannel };

      return { ...state, byId: channelsEntities };
    },
    [actions.delChanelIo](state, { payload: payloadedChannelId }) {
      const { byId, allIds } = state;
      const RemovedChannel = omit(byId, payloadedChannelId);
      const RemovedChannelIds = allIds.filter(id => !(id === payloadedChannelId.toString()));
      const prevChannelId = RemovedChannelIds[RemovedChannelIds.length - 1]
      return {
        ...state,
        byId: RemovedChannel,
        allIds: RemovedChannelIds,
        current: prevChannelId,
      };
    },
  },
  defaultChannelsState,
);

const messages = handleActions(
  {
    [actions.addMessageAll](state, { payload: payloadedMessages }) {
      const msgEntities = keyBy(payloadedMessages, 'id');
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
  defaultState,
);

export default combineReducers({
  form: formReducer,
  channels,
  messages,
});
