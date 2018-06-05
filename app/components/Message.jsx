import React from 'react';
import cn from 'classnames';

const Message = props => {
  const messageClasses = cn({
    'message': true,
    'message-self': props.self,
    'text-muted': props.status === 'pending',
    'text-danger': props.status === 'error',
  });
  return (
    <div className={messageClasses}>
      <h6>{props.author}</h6>
      <p>{props.body}</p>
    </div>
  );
};

export default Message;
