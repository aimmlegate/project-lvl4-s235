import * as actions from "./actions";

export default (store, channels, messages, userName) => {
  store.dispatch(actions.addChanel(channels));
  store.dispatch(actions.addMessage(messages));
  store.dispatch(actions.setUsername(userName));
};
