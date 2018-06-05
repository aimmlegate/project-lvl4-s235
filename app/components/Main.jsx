import React from 'react';
import { Row, Col } from 'reactstrap';
import Channels from '../components/Channels.jsx';
import InputMessage from '../components/InputMessage.jsx';
import Chat from '../components/Chat.jsx';

const Main = () => (
  <Row>
    <Col xs="2">
      <Channels/>
    </Col>
    <Col xs="9" className="chat-window">
      <Chat />
      <InputMessage />
    </Col>
  </Row>
);

export default Main;
