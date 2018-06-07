const apiPrefix = 'api/v1';

export default {
  addMessageToChannelUrl: channelId => [apiPrefix, 'channels', channelId, 'messages'].join('/'),
  addChannelUrl: () => [apiPrefix, 'channels'].join('/'),
};