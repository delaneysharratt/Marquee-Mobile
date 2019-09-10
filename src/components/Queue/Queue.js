import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './Queue.css';

//COMPONENT IMPORTS
import QueueItem from '../QueueItem/QueueItem';

class Queue extends Component {
  //Load queue on page load
  componentDidMount() {
    this.getQueue();
  }

  getQueue() {
    this.props.dispatch({
      type: 'FETCH_WATCHES'
    });
  }

  render() {
    //for each item in redux state.watch
    //render a QueueItem for that watch
    let queueList = this.props.watches.map((watch, i) => {
      return <QueueItem key={i} watch={watch} />;
    });
    return (
      <div className="Queue">
        <div className="QueueList">{queueList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watches: state.queue
});

export default connect(mapStateToProps)(Queue);
