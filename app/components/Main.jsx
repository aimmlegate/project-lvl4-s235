import React from 'react';
import { Row, Col } from 'reactstrap';
import Channels from '../components/Channels.jsx';
import InputMessage from '../components/InputMessage.jsx';
import Chat from '../components/Chat.jsx';
import Context from '../index';

const Main = props => {
  const { userName, clientId } = props;
  return (
    <Context.Provider value={{ userName, clientId }}>
      <Row>
        <Col xs="2">
          <Channels />
        </Col>
        <Col xs="9" className="chat-window">
          <Chat />
          <Context.Consumer>{selfData => <InputMessage selfData={selfData} />}</Context.Consumer>
        </Col>
      </Row>
    </Context.Provider>
  );
};

export default Main;
