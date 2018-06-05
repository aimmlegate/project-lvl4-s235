import React from 'react';
import cn from 'classnames';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

const Message = props => {
  const selfClass = cn({
    'text-primary': props.self,
    'text-muted': props.status === 'pending',
    'text-danger': props.status === 'error',
  });
  return (
    <Card>
      <CardBody>
        <CardTitle>{props.author}</CardTitle>
        <CardText className={selfClass}>{props.body}</CardText>
      </CardBody>
    </Card>
  );
};

export default Message;
