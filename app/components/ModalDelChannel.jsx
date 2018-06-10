import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  FormGroup,
} from 'reactstrap';

export default class ModalDelChannel extends React.Component {
  handleClose = (e) => {
    e.preventDefault();
    this.props.toggle();
  };

  delChannel = (e) => {
    e.preventDefault();
    this.props.delete();
    this.props.toggle();
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <Form>
            <ModalHeader toggle={this.handleClose}>Delete this channel</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleEmail">Are you sure?</Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.delChannel} type="submit">
                Delete
              </Button>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
