import * as actions from "./actions";

export default (store, channels, messages, userName) => {
  store.dispatch(actions.addChanel(channels));
  store.dispatch(actions.addMessageAll(messages));
  store.dispatch(actions.setUsername(userName));
};
