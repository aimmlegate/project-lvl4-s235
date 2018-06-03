import { createSelector } from "reselect";

const getMessages = state => state.messages;

const getMessagesSelector = createSelector(getMessages, msgs => msgs);

export default getMessagesSelector;
