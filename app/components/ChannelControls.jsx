import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import ModalNewChannel from './ModalNewChannel';
import ModalEditChannel from './ModalEditChannel';
import connect from '../connect';

const mapStateToProps = state => ({ channels: state.channels });

@connect(mapStateToProps)
export default class ChannelControls extends React.Component {
  state = { modalCreate: false, modalEdit: false };

  addNewChannel = name => this.props.addChannel(name);

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
            <NavItem>
              <NavLink href="#">Delete channel</NavLink>
            </NavItem>
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
          create={this.addNewChannel}
        />
      </div>
    );
  }
}
