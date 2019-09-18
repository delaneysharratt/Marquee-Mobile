import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { Rating } from '@material-ui/lab';
// import { Cancel } from '@material-ui/icons';

class ProfileItem extends Component {
  //re-fetches Profile after
  //updating watch rating
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
          src={`https://image.tmdb.org/t/p/original/${this.props.watch.poster}`}
        />
        <br />
        <Rating
          name={this.props.watch.title}
          value={this.props.watch.rating}
          onClick={this.updateRating}
          size="small"
        />
        {/* <br />
        <Cancel onClick={this.deleteWatch} fontSize="small" /> */}
      </div>
    );
  }
}

export default connect()(ProfileItem);
