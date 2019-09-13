import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { Rating } from '@material-ui/lab';
import { AddCircle } from '@material-ui/icons';

class FriendItem extends Component {
  state = {
    watch: {
      title: this.props.watch.title,
      poster: this.props.watch.poster,
      backdrop: this.props.watch.backdrop
    }
  };

  addWatch = event => {
    console.log('Adding to Queue...');
    this.props.dispatch({
      type: 'ADD_WATCH',
      payload: this.state.watch
    });
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
          name={this.props.watch.title}
          value={this.props.watch.rating}
          size="small"
        />
        <br />
        <AddCircle onClick={this.addWatch} fontSize="small" />
      </div>
    );
  }
}

export default connect()(FriendItem);
