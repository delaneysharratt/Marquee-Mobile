import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import Rating from '@material-ui/lab/Rating';
import CancelIcon from '@material-ui/icons/Cancel';

class ProfileItem extends Component {
  //re-fetches Profile
  //after updating watch
  getProfile() {
    this.props.dispatch({
      type: 'FETCH_PROFILE'
    });
  }

  updateRating = event => {
    let update = {
      id: this.props.watch.id,
      rating: event.target.value
    };

    this.props.dispatch({
      type: 'UPDATE_RATING',
      payload: update
    });

    this.getProfile();
  };

  //deletes watch from Queue/Profile
  deleteWatch = event => {
    this.props.dispatch({
      type: 'DELETE_WATCH',
      payload: this.props.watch.id
    });
    this.getProfile();
  };

  render() {
    return (
      <div key={this.props.watch.id} className="Poster">
        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w92/${this.props.watch.poster}`}
        />
        <br />
        <Rating
          name={this.props.watch.id}
          value={this.props.watch.rating}
          onClick={this.updateRating}
        />
        <CancelIcon onClick={this.deleteWatch} />
      </div>
    );
  }
}

export default connect()(ProfileItem);