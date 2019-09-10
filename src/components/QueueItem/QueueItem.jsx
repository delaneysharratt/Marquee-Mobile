import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class Queue extends Component {
  //switches "completed" to true/false
  changeCompletion = () => {
    this.props.dispatch({
      type: 'UPDATE_COMPLETION',
      payload: this.props.watch.id
    });
    this.getQueue();
  };

  //re-fetches Queue 
  //after updating watch
  getQueue() {
    this.props.dispatch({
      type: 'FETCH_WATCHES'
    });
  }

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
      </div>
    );
  }
}

export default connect()(Queue);
