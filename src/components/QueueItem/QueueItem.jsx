import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { CheckCircleOutline, CheckCircle, Cancel } from '@material-ui/icons';

class QueueItem extends Component {
  //re-fetches Queue after
  //updating watch completion
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
          <CheckCircle onClick={this.changeCompletion} fontSize="small" />
        ) : (
          <CheckCircleOutline
            onClick={this.changeCompletion}
            fontSize="small"
          />
        )}
        <Cancel onClick={this.deleteWatch} fontSize="small" />
      </div>
    );
  }
}

export default connect()(QueueItem);
