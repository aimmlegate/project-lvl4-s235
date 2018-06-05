import { reduxForm, Field } from 'redux-form';
import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Button,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Row,
  Col
} from 'reactstrap';
import connect from '../connect';

const mapStateToProps = ({ userName, clientId }) => ({ userName, clientId });

@connect(mapStateToProps)

class InputMessage extends React.Component {
  sendMessage = values => {
    const { userName, clientId } = this.props;
    if (values.message) {
      this.props.sendMessage(1, values, userName, clientId);
      this.props.reset();
    }
  };

  render() {
    const { userName } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.sendMessage)} className="chat-form">
        <FormGroup>
          <Row>
            <Col xs="12">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>{userName}</InputGroupText>
                </InputGroupAddon>
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
  form: 'inputMessage',
})(InputMessage);
