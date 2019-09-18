import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { CheckCircleOutline, CheckCircle, Cancel } from '@material-ui/icons';
import { LooksOne as One, LooksTwo as Two, Looks3 as Three } from '@material-ui/icons';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 85,
    fontSize: 'small'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class QueueItem extends Component {
  //re-fetches Queue after
  //updating watch completion
  getQueue() {
    this.props.dispatch({
      type: 'FETCH_WATCHES'
    });
  }

  //updates priority status to selected
  updatePriority = level => {
    let update = {
      id: this.props.watch.id,
      priority: level
    };

    console.log(update);

    this.props.dispatch({
      type: 'UPDATE_PRIORITY',
      payload: update
    });
    this.getQueue();
  };

  // //switches "completed" to true/false
  updateCompleted = event => {
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

  setPriority() {
    const priority = this.props.watch.priority;
    if (priority === null) {
      return (<span><One value="high" onClick={() => this.updatePriority('high')} fontSize="small" />
        <Two value="medium" onClick={() => this.updatePriority('medium')} fontSize="small" />
        <Three value="low" onClick={() => this.updatePriority('low')} fontSize="small" /></span>)
    } else if (priority === 'high'){
      return (<span><One value="high" color="primary" onClick={() => this.updatePriority('high')} fontSize="small" />
        <Two value="medium" onClick={() => this.updatePriority('medium')} fontSize="small" />
        <Three value="low" onClick={() => this.updatePriority('low')} fontSize="small" /></span>)
    } else if (priority === 'medium'){
      return (<span><One value="high" onClick={() => this.updatePriority('high')} fontSize="small" />
        <Two value="medium" color="primary" onClick={() => this.updatePriority('medium')} fontSize="small" />
        <Three value="low" onClick={() => this.updatePriority('low')} fontSize="small" /></span>)
    } else if (priority === 'low'){
      return (<span><One value="high" onClick={() => this.updatePriority('high')} fontSize="small" />
        <Two value="medium"  onClick={() => this.updatePriority('medium')} fontSize="small" />
        <Three value="low" color="primary" onClick={() => this.updatePriority('low')} fontSize="small" /></span>)
    }
  }

  render() {
    const isCompleted = this.props.watch.completed;

    return (
      <div key={this.props.watch.id} className="Poster">
        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w154/${this.props.watch.poster}`}
        />
        <br/>
        {this.setPriority()}

        {isCompleted ? (
          <CheckCircle onClick={this.updateCompleted} fontSize="small" />
        ) : (
          <CheckCircleOutline onClick={this.updateCompleted} fontSize="small" />
        )}
        <Cancel onClick={this.deleteWatch} fontSize="small" />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(QueueItem));
