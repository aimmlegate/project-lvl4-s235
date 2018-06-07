import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup} from 'reactstrap';

class ModalNewChannel extends React.Component {
  state = {name: ''};

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleClose = () => {
    this.props.toggle();
    this.setState({ name: ''});
  }

  handleSubmit = () => {
    this.props.submit(this.state.name);
    this.props.toggle();
    this.setState({ name: ''});
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader toggle={this.handleClose}>New Channel</ModalHeader>
          <ModalBody>
            <Form>
            <FormGroup>
              <Label for="exampleEmail">Channel name</Label>
              <Input type="text" name="channelName" placeholder="Enter name" value={this.state.name} onChange={this.handleChange}/>
            </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Create</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalNewChannel;