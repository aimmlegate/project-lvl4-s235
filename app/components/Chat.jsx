import React from 'react';
import Message from './Message';
import connect from '../connect';
import getMessagesSelector from '../selectors';

const mapStateToProps = state => ({
  messages: getMessagesSelector(state),
  clientId: state.clientId,
});

@connect(mapStateToProps)
export default class Chat extends React.Component {
  scrollToBottom() {
    const window = this.chatWindow;
    window.scrollTop = window.scrollHeight - window.clientHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    const { messages } = this.props;
    const { clientId } = this.props.selfData;
    const { byId: messagesById, allIds: messagesIds } = messages;
    const chatOverflow = {
      'overflow-y': 'scroll',
    };
    return (
      <div
        ref={el => {
          this.chatWindow = el;
        }}
        className="flex-grow-1 mb-3 p-3 border rounded shadow-sm "
        style={chatOverflow}
      >
        {messagesIds.map(msgId => {
          const { author, body, clientId: msgClientId, status, id, localId } = messagesById[msgId];
          return (
            <Message
              key={id || localId}
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
