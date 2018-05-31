import React from "react";
import { Container, Row, Col } from "reactstrap";
import Chat from "./Chat";
import ChannelsContainer from "../containers/ChannelsContainer";
import InputMessageContainer from "../containers/InputMessageContainer";

const Main = props => {
  return (
    <Container>
      <Row>
        <Col xs="3">
          <ChannelsContainer />
        </Col>
        <Col xs="8">
          <Chat />
          <InputMessageContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
