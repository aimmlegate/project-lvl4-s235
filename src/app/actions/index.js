import { createAction } from 'redux-actions';
import uuidv1 from 'uuid/v1';

export const addChanel = createAction('CHANEL_ADD');
export const addMessageAll = createAction('MESSAGE_ALL_ADD');
export const addMessage = createAction('MESSAGE_ADD', message => ({ id: uuidv1(), ...message }));
export const setUsername = createAction('SET_USERNAME');