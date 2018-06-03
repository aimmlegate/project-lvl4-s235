/* eslint-disable */
import { reduxForm } from "redux-form";
import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroupAddon,
  InputGroup
} from "reactstrap";
import { Row, Col } from "reactstrap";
import { Field } from "redux-form";

class InputMessage extends React.Component {
  sendMessage = values => {
    const { userName, clientId } = this.props;
    this.props.sendMessage(1, values, userName, clientId);
    this.props.reset();
  };

  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.sendMessage)}
        className="chat-form"
      >
        <FormGroup>
          <Row>
            <Col xs="12">
              <InputGroup>
                <Input
                  name="message"
                  tag={Field}
                  component="input"
                  className="messageInput"
                  type="text"
                  placeholder="Message..."
                />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" type="submit">
                    Send
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

export default reduxForm({
  form: "inputMessage"
})(InputMessage);
