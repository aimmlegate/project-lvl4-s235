import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup,
} from 'reactstrap';

class ModalEditChannel extends React.Component {

  handleClose = () => {
    this.props.toggle();
    this.props.reset();
  };

  createChannel = values => {
    const { channelName } = values;
    this.props.create(channelName);
    this.props.toggle();
    this.props.reset();
  };
 
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <Form onSubmit={this.props.handleSubmit(this.createChannel)}>
            <ModalHeader toggle={this.handleClose}>New Channel</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleEmail">Channel name</Label>
                <Input
                  tag={Field}
                  type="text"
                  component="input"
                  name="channelName"
                  placeholder="Enter name"
                  required
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Create
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'editChannel',
})(ModalEditChannel);
