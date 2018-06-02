import React from "react";
import cn from "classnames";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

const Message = props => {
  const selfClass = cn({
    'card-self': props.self,
  });
  return (
    <Card className={ selfClass }>
      <CardBody>
        <CardTitle>{ props.author }</CardTitle>
        <CardText>{ props.body }</CardText>
      </CardBody>
    </Card>
  );
};

export default Message;
