import React from 'react';
import cn from 'classnames';
import { Alert } from 'reactstrap';
import connect from '../connect';
import ModalNewChannel from './ModalNewChannel';

const mapStateToProps = state => ({ channels: state.channels });

@connect(mapStateToProps)
export default class Channels extends React.Component {

  state = {modal: false};

  changeChannel = id => () => {
    this.props.setCurrentChanel(id);
  };

  addNewChannel = name => {
    this.props.addChannel(name);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { allIds, byId, current } = this.props.channels;
    return (
      <div>
        <div className="chat-containet">
          {allIds.map(id => (
            <Alert
              color="secondary"
              className={cn({ 'alert-success': id === current })}
              key={id}
              onClick={this.changeChannel(id)}
            >
              {byId[id].name}
            </Alert>
          ))}
          <Alert color="info" onClick={this.toggle}>New channel+</Alert>
        </div>
        <ModalNewChannel isOpen={this.state.modal} toggle={this.toggle} submit={this.addNewChannel} />
      </div>
    );
  }
}
