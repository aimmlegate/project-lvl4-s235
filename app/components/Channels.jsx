import React from 'react';
import cn from 'classnames';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import connect from '../connect';

const mapStateToProps = state => ({ channels: state.channels });

@connect(mapStateToProps)
export default class Channels extends React.Component {
  changeChannel = id => () => {
    this.props.setCurrentChanel(id);
  };

  renderNewBadge = (id) => {
    const { byId, current } = this.props.channels;
    const { status } = byId[id];
    if ((status === 'new') && (!(current === id))) {
      return <Badge color="secondary">New</Badge>;
    }
    return null;
  };

  render() {
    const { allIds, byId, current } = this.props.channels;
    return (
      <div>
        <ListGroup className="shadow-sm">
          {allIds.map(id => (
            <ListGroupItem
              className={cn({ active: id === current })}
              key={id}
              onClick={this.changeChannel(id)}
            >
              {byId[id].name} {'  '}
              {this.renderNewBadge(id)}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
