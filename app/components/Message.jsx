import React from 'react';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = state => ({
  currentChannel: state.channels.current,
});

@connect(mapStateToProps)
export default class Message extends React.Component {
  resendMessage = () => {
    const {
      author,
      clientId,
      channel,
      body,
      id,
    } = this.props;
    const values = { message: body };
    this.props.sendMessage(channel, values, author, clientId);
    this.props.messageDel(id);
  };

  renderRetry = () => {
    if (this.props.status === 'error') {
      return <a href="#" onClick={this.resendMessage}>retry</a>;
    }
    return null;
  };

  render() {
    const messageClasses = cn({
      'd-flex': true,
      'flex-column': true,
      'mb-3': true,
      'align-items-end': this.props.self,
      'text-muted': this.props.status === 'pending',
      'text-danger': this.props.status === 'error',
    });
    return (
      <div className={messageClasses}>
        <h6>{this.props.author}</h6>
        <p className='mb-0'>{this.props.body}</p>
        {this.renderRetry()}
      </div>
    );
  }
}
