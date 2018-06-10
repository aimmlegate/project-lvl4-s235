import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import ModalNewChannel from './ModalNewChannel';
import ModalEditChannel from './ModalEditChannel';
import ModalDelChannel from './ModalDelChannel';
import connect from '../connect';

const mapStateToProps = state => ({ channels: state.channels });

@connect(mapStateToProps)
export default class ChannelControls extends React.Component {
  state = { modalCreate: false, modalEdit: false, modalDel: false };

  addNewChannel = name => this.props.addChannel(name);

  editChannel = (name) => {
    const { current } = this.props.channels;
    this.props.editChannel(name, current);
  };

  delChannel = () => {
    const { current } = this.props.channels;
    this.props.delChannel(current);
  };

  toggleNewChannel = () => {
    this.setState({
      modalCreate: !this.state.modalCreate,
    });
  };

  toggleEditChannel = () => {
    this.setState({
      modalEdit: !this.state.modalEdit,
    });
  };

  toggleDelChannel = () => {
    this.setState({
      modalDel: !this.state.modalDel,
    });
  };

  renderDelControl = () => {
    const { current, byId } = this.props.channels;
    const { removable } = byId[current];
    if (removable) {
      return (
        <NavItem>
          <NavLink href="#" onClick={this.toggleDelChannel}>
            Delete channel
          </NavLink>
        </NavItem>
      );
    } return null;
  }

  getCurrentChannelName = () => {
    const { current, byId } = this.props.channels;
    const { name } = byId[current];
    return name;
  }

  render() {
    const { current, byId } = this.props.channels;
    const { name } = byId[current];
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>{name}</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={this.toggleNewChannel}>
                New channel
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={this.toggleEditChannel}>
                Edit channel
              </NavLink>
            </NavItem>
            {this.renderDelControl()}
          </Nav>
        </Navbar>
        <ModalNewChannel
          isOpen={this.state.modalCreate}
          toggle={this.toggleNewChannel}
          create={this.addNewChannel}
        />
        <ModalEditChannel
          isOpen={this.state.modalEdit}
          toggle={this.toggleEditChannel}
          initialValue={{ channelName: name }}
          create={this.editChannel}
        />
        <ModalDelChannel
          isOpen={this.state.modalDel}
          toggle={this.toggleDelChannel}
          delete={this.delChannel}
        />
      </div>
    );
  }
}
