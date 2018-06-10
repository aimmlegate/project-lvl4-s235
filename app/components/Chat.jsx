import React from 'react';
import Message from './Message';
import connect from '../connect';
import getMessagesSelector from '../selectors';

const mapStateToProps = state => ({
  messages: getMessagesSelector(state),
  clientId: state.clientId,
  currentChannel: state.channels.current,
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
    const { messages, currentChannel } = this.props;
    const { clientId } = this.props.selfData;
    const { byId: messagesById, allIds: messagesIds } = messages;
    const chatOverflow = {
      overflowY: 'scroll',
    };
    return (
      <div
        ref={(el) => {
          this.chatWindow = el;
        }}
        className="flex-grow-1 mb-3 p-3 border rounded shadow-sm"
        style={chatOverflow}
      >
        {messagesIds.map((msgId) => {
          const {
            author,
            body,
            clientId: msgClientId,
            status,
            id,
            localId,
            channelId,
          } = messagesById[msgId];
          if (channelId.toString() === currentChannel.toString()) {
            return (
              <Message
                key={id || localId}
                id={id || localId}
                channel={channelId}
                author={author}
                body={body}
                clientId={clientId}
                self={clientId === msgClientId}
                status={status}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}
