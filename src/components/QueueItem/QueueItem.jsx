import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
  CheckCircleOutline as Incomplete,
  CheckCircle as Complete,
  Cancel as Delete
} from '@material-ui/icons';
//priority status icons
import {
  LooksOne as First,
  LooksTwo as Second,
  Looks3 as Third
} from '@material-ui/icons';

//DIALOG BOX ON COMPLETE/DELETE
import Swal from 'sweetalert2';

//MATERIAL-UI STYLING
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
    //dialog box message for update
    this.priorityAlert();
    //declares payload object with
    //targeted watch id + new priority
    let update = {
      id: this.props.watch.id,
      priority: level
    };
    //send dispatch for PUT
    this.props.dispatch({
      type: 'UPDATE_PRIORITY',
      payload: update
    });
    //reset page on update
    this.getQueue();
  };

  priorityAlert() {
    //dialog box notification
    Swal.fire({
      type: 'success',
      title: 'Priority updated!',
      showConfirmButton: false,
      timer: 1000
    });
  }

  //switches "completed" to true/false
  updateCompleted = event => {
    //dialog box message for update
    this.completeAlert();
    //send dispatch for PUT
    this.props.dispatch({
      type: 'UPDATE_COMPLETED',
      payload: this.props.watch.id
    });
    //re-fetch updated queue
    this.getQueue();
  };

  completeAlert() {
    //variable for whether show is completed (true/false)
    const completed = this.props.watch.completed;
    //send alert based on current completion status
    if (completed === false) {
      Swal.fire({
        type: 'success',
        title: 'Show completed!',
        showConfirmButton: false,
        timer: 1000
      });
    } else if (completed === true) {
      Swal.fire({
        type: 'error',
        title: 'Show marked as incomplete',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  deleteAlert = () => {
    //dialog box confirmation
    Swal.fire({
      title: 'Are you sure you want to delete this show?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, please delete!'
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', 'This show has been removed.', 'success');
        this.deleteWatch();
      }
    });
  };

  //deletes watch from Queue/Collection
  deleteWatch() {
    console.log('Deleting show...');
    //send dispatch for DELETE
    this.props.dispatch({
      type: 'DELETE_WATCH',
      payload: this.props.watch.id
    });
    this.getQueue();
  }

  //determines priority icon display (1/2/3)
  setPriority() {
    const completed = this.props.watch.completed;
    const priority = this.props.watch.priority;

    if (completed === true) {
      return (
        <span>
          <First color="disabled" fontSize="small" />
          <Second color="disabled" fontSize="small" />
          <Third color="disabled" fontSize="small" />
        </span>
      );
    } else if (priority === null) {
      return (
        <span>
          <First
            value="1"
            onClick={() => this.updatePriority('1')}
            fontSize="small"
          />
          <Second
            value="2"
            onClick={() => this.updatePriority('2')}
            fontSize="small"
          />
          <Third
            value="3"
            onClick={() => this.updatePriority('3')}
            fontSize="small"
          />
        </span>
      );
    } else if (priority === '1') {
      return (
        <span>
          <First
            value="1"
            color="primary"
            onClick={() => this.updatePriority('1')}
            fontSize="small"
          />
          <Second
            value="2"
            onClick={() => this.updatePriority('2')}
            fontSize="small"
          />
          <Third
            value="3"
            onClick={() => this.updatePriority('3')}
            fontSize="small"
          />
        </span>
      );
    } else if (priority === '2') {
      return (
        <span>
          <First
            value="1"
            onClick={() => this.updatePriority('1')}
            fontSize="small"
          />
          <Second
            value="2"
            color="primary"
            onClick={() => this.updatePriority('2')}
            fontSize="small"
          />
          <Third
            value="3"
            onClick={() => this.updatePriority('3')}
            fontSize="small"
          />
        </span>
      );
    } else if (priority === '3') {
      return (
        <span>
          <First
            value="1"
            onClick={() => this.updatePriority('1')}
            fontSize="small"
          />
          <Second
            value="2"
            onClick={() => this.updatePriority('2')}
            fontSize="small"
          />
          <Third
            value="3"
            color="primary"
            onClick={() => this.updatePriority('3')}
            fontSize="small"
          />
        </span>
      );
    }
  }

  render() {
    const isCompleted = this.props.watch.completed;

    return (
      <div key={this.props.watch.id} className="Poster">
        {isCompleted ? (
          <div className="completed-watch">
            <img
              alt={this.props.watch.title}
              src={`https://image.tmdb.org/t/p/original/${this.props.watch.poster}`}
              className="completed-watch"
            />
          </div>
        ) : (
          <img
            alt={this.props.watch.title}
            src={`https://image.tmdb.org/t/p/original/${this.props.watch.poster}`}
          />
        )}

        <br />

        {this.setPriority()}

        {isCompleted ? (
          <Complete onClick={this.updateCompleted} fontSize="small" />
        ) : (
          <Incomplete onClick={this.updateCompleted} fontSize="small" />
        )}
        <Delete onClick={this.deleteAlert} fontSize="small" />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(QueueItem));
