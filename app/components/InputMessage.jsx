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
  Col,
} from 'reactstrap';
import connect from '../connect';

const mapStateToProps = state => ({
  currentChannel: state.channels.current,
});

@connect(mapStateToProps)
class InputMessage extends React.Component {
  sendMessage = values => {
    const { userName, clientId } = this.props.selfData;
    const { currentChannel } = this.props;
    if (values.message) {
      this.props.sendMessage(currentChannel, values, userName, clientId);
      this.props.reset();
    }
  };

  render() {
    const { userName } = this.props.selfData;
    return (
      <Form onSubmit={this.props.handleSubmit(this.sendMessage)}>
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
