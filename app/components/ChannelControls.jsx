import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import ModalNewChannel from './ModalNewChannel';
import connect from '../connect';

const mapStateToProps = state => ({ channels: state.channels });

@connect(mapStateToProps)
export default class ChannelControls extends React.Component {
  state = { modal: false };

  addNewChannel = name => {
    this.props.addChannel(name);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
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
              <NavLink href="#" onClick={this.toggle}>
                New channel
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Edit channel</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Delete channel</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <ModalNewChannel
          isOpen={this.state.modal}
          toggle={this.toggle}
          create={this.addNewChannel}
        />
      </div>
    );
  }
}
