/* eslint-disable */
import { reduxForm } from 'redux-form';
import React from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Field } from 'redux-form';

class InputMessage extends React.Component {
  sendMessage = (values) => {
    console.log(values);
    //this.props.addMessage(values);
    this.props.reset();
  }

  render() {
    return(
      <Form onSubmit={this.props.handleSubmit(this.sendMessage)}>
        <FormGroup>
          <Row>
            <Col xs="8">
              <Field name="message" component={Input} className='messageInput' type="textarea" placeholder='Message...'/>
            </Col>
            <Col xs="3">
              <Button type="submit">Отправить</Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'inputMessage',
})(InputMessage);