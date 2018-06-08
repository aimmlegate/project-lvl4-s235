import React from 'react';
import { Row, Col } from 'reactstrap';
import Channels from '../components/Channels.jsx';
import ChannelControls from '../components/ChannelControls';
import InputMessage from '../components/InputMessage.jsx';
import Chat from '../components/Chat.jsx';
import Context from '../index';

const Main = (props) => {
  const { userName, clientId } = props;
  const chatWindowSize = {
    height: 'calc(100vh - 150px)',
  };
  return (
    <Context.Provider value={{ userName, clientId }}>
      <Row className="mb-3">
        <Col xs="2" className="d-flex justify-content-center align-items-center">
        <h5>{userName}</h5>
        </Col>
        <Col xs="10">
          <ChannelControls />
        </Col>
      </Row>
      <Row>
        <Col xs="2">
          <Channels />
        </Col>
        <Col xs="10" className="d-flex flex-column" style={chatWindowSize}>
          <Context.Consumer>{selfData => <Chat selfData={selfData} />}</Context.Consumer>
          <Context.Consumer>{selfData => <InputMessage selfData={selfData} />}</Context.Consumer>
        </Col>
      </Row>
    </Context.Provider>
  );
};

export default Main;
