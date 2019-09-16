import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { CheckCircleOutline, CheckCircle, Cancel } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {}
});

class QueueItem extends Component {
  state = {
    open: false
  };

  //re-fetches Queue after
  //updating watch completion
  getQueue() {
    this.props.dispatch({
      type: 'FETCH_WATCHES'
    });
  }

  //switches "completed" to true/false
  changeCompletion = event => {
    event.preventDefault();
    this.props.dispatch({
      type: 'UPDATE_COMPLETED',
      payload: this.props.watch.id
    });

    this.setState({ open: true });
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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
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

        {/* SNACKBAR POPUP NOTIFICATION */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="message-id">
              {isCompleted ? 'Marked as complete' : 'Marked as incomplete'}
            </span>
          }
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.changeCompletion}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

QueueItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(QueueItem));
