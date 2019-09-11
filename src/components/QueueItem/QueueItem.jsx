import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

class QueueItem extends Component {
  //re-fetches Queue
  //after updating watch
  getQueue() {
    this.props.dispatch({
      type: 'FETCH_WATCHES'
    });
  }

  //switches "completed" to true/false
  changeCompletion = () => {
    this.props.dispatch({
      type: 'UPDATE_COMPLETED',
      payload: this.props.watch.id
    });
    this.getQueue();
  };

  //deletes watch from Queue/Collection
  deleteWatch = event => {
    this.props.dispatch({
      type: 'DELETE_WATCH',
      payload: this.props.watch.id
    });
    this.getQueue();
  };

  render() {
    const isCompleted = this.props.watch.completed;

    return (
      <div key={this.props.watch.id} className="Poster">
        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w92/${this.props.watch.poster}`}
        />
        <br />
        {isCompleted ? (
          <CheckCircleIcon onClick={this.changeCompletion} />
        ) : (
          <CheckCircleOutlineIcon onClick={this.changeCompletion} />
        )}
        <CancelIcon onClick={this.deleteWatch} />
      </div>
    );
  }
}

export default connect()(QueueItem);
