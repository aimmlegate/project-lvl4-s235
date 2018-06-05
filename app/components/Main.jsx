import React from 'react';
import { Row, Col } from 'reactstrap';
import ChannelsContainer from '../containers/ChannelsContainer';
import InputMessageContainer from '../containers/InputMessageContainer';
import ChatContainer from '../containers/ChatContainer';

const Main = () => (
  <Row>
    <Col xs="2">
      <ChannelsContainer />
    </Col>
    <Col xs="9" className="chat-window">
      <ChatContainer />
      <InputMessageContainer />
    </Col>
  </Row>
);

export default Main;
