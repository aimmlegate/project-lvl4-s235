import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { omit, keyBy, pick } from 'lodash';
import * as actions from '../actions';

const defaultState = {};
const defaultChannelsState = { current: '1' };
const defaultAppStatusState = { statusText: 'Hello world', type: 'ok' };

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
    [actions.addChanelIo](state, { payload: payloadedChannel }) {
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
      const { byId } = state;
      const channelToUpdate = byId[payloadedCurrentId];
      const updatedChannel = { ...channelToUpdate, status: 'seen' };
      const channelsEntities = { ...byId, [payloadedCurrentId]: updatedChannel };

      return {
        ...state,
        byId: channelsEntities,
        current: payloadedCurrentId,
      };
    },
    [actions.editChanelIo](state, { payload: payloadedChannel }) {
      const { id } = payloadedChannel;
      const channelsEntities = { ...state.byId, [id]: payloadedChannel };

      return { ...state, byId: channelsEntities };
    },
    [actions.delChanelIo](state, { payload: payloadedChannelId }) {
      const { byId, allIds } = state;
      const RemovedChannel = omit(byId, payloadedChannelId);
      const RemovedChannelIds = allIds.filter(id => (id !== payloadedChannelId.toString()));
      const prevChannelId = RemovedChannelIds[0];

      return {
        ...state,
        byId: RemovedChannel,
        allIds: RemovedChannelIds,
        current: prevChannelId,
      };
    },
    [actions.addMessageIo](state, { payload }) {
      const { byId, current } = state;
      const { message } = payload;
      const { channelId } = message;
      const normalizeCurrentId = current.toString();
      const normalizeChanelId = channelId.toString();
      if (normalizeCurrentId === normalizeChanelId) {
        return { ...state };
      }
      const channelToUpdate = byId[channelId];
      const updatedChannel = { ...channelToUpdate, status: 'new' };
      const channelsEntities = { ...byId, [channelId]: updatedChannel };
      return {
        ...state,
        byId: channelsEntities,
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
    [actions.addMessageIo](state, { payload }) {
      const { localID, message } = payload;
      const { id, clientId } = message;
      if (localID === clientId) {
        return { ...state };
      }
      const { byId, allIds } = state;
      const msgEntities = { ...byId, [id]: message };
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
      const { byId } = state;
      const messageWithStatus = { ...byId[localMsgId], status: 'ok' };
      const msgEntities = { ...byId, [localMsgId]: messageWithStatus };

      return {
        ...state,
        byId: msgEntities,
      };
    },
    [actions.addMessageFailure](state, { payload: localMsgId }) {
      const message = state.byId[localMsgId];
      const messageWithStatus = { ...message, status: 'error' };
      const msgEntities = { ...state.byId, [localMsgId]: messageWithStatus };

      return { ...state, byId: msgEntities };
    },
    [actions.delChanelIo](state, { payload: payloadedChannelId }) {
      const { byId, allIds } = state;
      const RemoveMessagesIds = allIds.filter((id) => {
        const { channelId } = byId[id];
        const normChannelId = channelId.toString();
        const normpayloadedChannelId = payloadedChannelId.toString();
        return (normChannelId !== normpayloadedChannelId);
      });
      const RemoveMessagesEntities = pick(byId, RemoveMessagesIds);
      return {
        ...state,
        byId: RemoveMessagesEntities,
        allIds: RemoveMessagesIds,
      };
    },
    [actions.messageDel](state, { payload: localMsgId }) {
      const { byId, allIds } = state;
      const RemovedLocalMessage = omit(byId, localMsgId);
      const RemovedLocalMessageId = allIds.filter(id => (id !== localMsgId));

      return {
        ...state,
        byId: RemovedLocalMessage,
        allIds: RemovedLocalMessageId,
      };
    },
  },
  defaultState,
);

const appstatus = handleActions(
  {
    [actions.addChanelRequest](state) {
      return { ...state, statusText: 'adding channel...', type: 'info' };
    },
    [actions.addChanelSuccess](state) {
      return { ...state, statusText: 'ok', type: 'ok' };
    },
    [actions.addChanelFailure](state, { payload: error }) {
      return { ...state, statusText: error, type: 'error' };
    },
    [actions.editChanelRequest](state) {
      return { ...state, statusText: 'edit channel...', type: 'info' };
    },
    [actions.editChanelSuccess](state) {
      return { ...state, statusText: 'ok', type: 'ok' };
    },
    [actions.editChanelFailure](state, { payload: error }) {
      return { ...state, statusText: error, type: 'error' };
    },
    [actions.delChanelRequest](state) {
      return { ...state, statusText: 'deleting channel...', type: 'info' };
    },
    [actions.delChanelSuccess](state) {
      return { ...state, statusText: 'ok', type: 'ok' };
    },
    [actions.delChanelFailure](state, { payload: error }) {
      return { ...state, statusText: error, type: 'error' };
    },
  },
  defaultAppStatusState,
);

export default combineReducers({
  form: formReducer,
  channels,
  messages,
  appstatus,
});
