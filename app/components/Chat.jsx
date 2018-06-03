/* eslint-disable */

import React from "react";
import { Alert } from "reactstrap";
import Message from "./Message";

export default class Chat extends React.Component {
  scrollToBottom() {
    const window = this.chatWindow;
    window.scrollTop = window.scrollHeight - window.clientHeight;
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }
  componentDidMount(prevProps, prevState) {
    this.scrollToBottom();
  }

  render() {
    const { messages, clientId } = this.props;
    const messagesKeys = Object.keys(messages);
    return (
      <div
        ref={el => {
          this.chatWindow = el;
        }}
        className="chat-container"
      >
        {messagesKeys.map(msgid => {
          const { author, body, clientId: msgClientId, status } = messages[
            msgid
          ];
          return (
            <Message
              key={msgid}
              author={author}
              body={body}
              self={clientId === msgClientId}
              status={status}
            />
          );
        })}
      </div>
    );
  }
}
