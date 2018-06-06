import React from 'react';
import cn from 'classnames';
import { Alert } from 'reactstrap';
import connect from '../connect';


const mapStateToProps = state => ({ channels: state.channels });

@connect(mapStateToProps)
export default class Channels extends React.Component {
  changeChannel = id => () => {
    this.props.setCurrentChanel(id);
  };
  render() {
    const { allIds, byId, current } = this.props.channels;
    return (
      <div className="chat-containet">
        {allIds.map(id => (
          <Alert
            color='secondary'
            className={cn({ 'alert-success': id === current })}
            key={id}
            onClick={this.changeChannel(id)}
          >
            {byId[id].name}
          </Alert>
        ))}
        <Alert color="info">New channel+</Alert>
      </div>
    );
  }
}
