import React from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

const Message = props => (
  <Card>
    <CardBody>
      <CardTitle>{props.author}</CardTitle>
      <CardText>{props.body}</CardText>
    </CardBody>
  </Card>
);

export default Message;
