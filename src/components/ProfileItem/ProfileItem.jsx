import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { Rating } from '@material-ui/lab';
import { Cancel } from '@material-ui/icons';

//DIALOG BOX ON DELETE
import Swal from 'sweetalert2';

class ProfileItem extends Component {
  //re-fetches Profile after
  //updating watch rating
  getProfile() {
    this.props.dispatch({
      type: 'FETCH_PROFILE'
    });
  }

  updateRating = event => {
    //dialog box notification
    Swal.fire({
      type: 'success',
      title: 'Rating updated!',
      showConfirmButton: false,
      timer: 1000
    });
    //declares payload object with
    //targeted watch id + new rating
    let update = {
      id: this.props.watch.id,
      rating: event.target.value
    };
    //send dispatch for PUT
    this.props.dispatch({
      type: 'UPDATE_RATING',
      payload: update
    });
    //reset page on update
    this.getProfile();
  };

  deleteAlert = () => {
    //dialog box confirmation
    Swal.fire({
      title: 'Are you sure you want to delete this show?',
      text: "You won't be able to undo this action!",
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

  //deletes watch from Queue/Profile
  deleteWatch() {
    console.log('Deleting show...');
    //send dispatch for DELETE
    this.props.dispatch({
      type: 'DELETE_WATCH',
      payload: this.props.watch.id
    });
    this.props.dispatch({
      type: 'FETCH_PROFILE'
    });
    this.getProfile();
  }

  render() {
    return (
      <div key={this.props.watch.id} className="Poster">
        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/original/${this.props.watch.poster}`}
        />
        <br />
        <Rating
          name={this.props.watch.title}
          value={this.props.watch.rating}
          onClick={this.updateRating}
          size="small"
        />
        <br />
        <Cancel onClick={this.deleteAlert} fontSize="small" />
      </div>
    );
  }
}

export default connect()(ProfileItem);
