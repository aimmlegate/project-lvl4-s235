import React from "react";
import { Alert } from 'reactstrap';

export default class Channels extends React.Component {
  
  render() {
    const { channels } = this.props;
    const channelsKey = Object.keys(channels);
    return(
      <div className='chat-containet'>
        {channelsKey.map((id) => (<Alert key={id}>{channels[id].name}</Alert>))}
      </div>
    );
  }
}