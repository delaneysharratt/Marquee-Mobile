import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { CheckCircleOutline, CheckCircle, Cancel } from '@material-ui/icons';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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
  updatePriority = event => {
    let update = {
      id: this.props.watch.id,
      priority: event.target.value
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

  render() {
    const { classes } = this.props;
    const isCompleted = this.props.watch.completed;

    return (
      <div key={this.props.watch.id} className="Poster">
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Priority</InputLabel>
            <Select
              native
              value={this.props.watch.priority}
              onChange={this.updatePriority}
            >
              <option value="" />
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>
        </div>

        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w154/${this.props.watch.poster}`}
        />
        <br />
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
