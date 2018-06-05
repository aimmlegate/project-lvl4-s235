import * as actions from './actions';

export default (store, channels, messages) => {
  store.dispatch(actions.addChanel(channels));
  store.dispatch(actions.addMessageAll(messages));
};
