import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { AddCircle } from '@material-ui/icons';

class FriendItem extends Component {
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
        <AddCircle onClick={this.addWatch} fontSize="small" />
      </div>
    );
  }
}

export default connect()(FriendItem);
