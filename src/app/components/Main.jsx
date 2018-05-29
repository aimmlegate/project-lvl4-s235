import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const Main = (props) => {
  const { channels } = props.data;
  return(
    <Container>
      <Row>
        <Col xs="3">
          <ListGroup>
            {channels.map(el => <ListGroupItem key={el.id}>{el.name}</ListGroupItem>)}
          </ListGroup>
        </Col>
        <Col xs="auto">
          chat will be here
        </Col>

      </Row>
    </Container>
  );
};

export default Main;