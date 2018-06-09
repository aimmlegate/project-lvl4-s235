import React from 'react';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = state => ({
  status: state.appstatus,
});

@connect(mapStateToProps)
class Status extends React.Component {
  render() {
    const { statusText, type } = this.props.status;
    const statusClasses = cn({
      'text-danger': (type === 'error'),
      'text-warning': (type === 'info'),
      'text-white': (type === 'ok'),
    });

    return (
      <div className="p-1">
        <div className={statusClasses}>
          {statusText}
        </div>
      </div>
    );
  }
}

export default Status;
