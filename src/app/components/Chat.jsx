/* eslint-disable */

import React from "react";
import { Alert } from 'reactstrap';

export default class Chat extends React.Component {
  render() {
    const { messages } = this.props;
    const messagesKey = Object.keys(messages);
    return(
      <div className='chat-containet'>
        {messagesKey.map((id) => (<Alert key={id}>{messages[id].message}</Alert>))}
      </div>
    );
  }
}