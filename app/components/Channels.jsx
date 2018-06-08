import React from 'react';
import cn from 'classnames';
import { ListGroup, ListGroupItem } from 'reactstrap';
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
      <div>
        <ListGroup>
          {allIds.map(id => (
            <ListGroupItem
              className={cn({ 'active': id === current })}
              key={id}
              onClick={this.changeChannel(id)}
            >
              {byId[id].name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
