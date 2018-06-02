/* eslint-disable */

import React from "react";
import { Alert } from "reactstrap";
import Message from "./Message";

export default class Chat extends React.Component {
  render() {
    const { messages, clientId } = this.props;
    const messagesKeys = Object.keys(messages);
    return (
      <div className="chat-container">
        {messagesKeys.map(msgid => {
          const { author, body, clientId: msgClientId } = messages[msgid];
          return (
            <Message
              key={msgid}
              author={author}
              body={body}
              self={clientId === msgClientId}
            />
          );
        })}
      </div>
    );
  }
}
