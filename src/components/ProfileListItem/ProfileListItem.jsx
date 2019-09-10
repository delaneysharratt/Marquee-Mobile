import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import CancelIcon from '@material-ui/icons/Cancel';

class ProfileListItem extends Component {
  //re-fetches Profile Collection
  //after updating watch
  getCollection() {
    this.props.dispatch({
      type: 'FETCH_PROFILE'
    });
  }

  //deletes watch from Queue/Collection
  deleteWatch = event => {
    this.props.dispatch({
      type: 'DELETE_WATCH',
      payload: this.props.watch.id
    });
    this.getCollection();
  };

  render() {
    return (
      <div key={this.props.watch.id} className="Poster">
        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w92/${this.props.watch.poster}`}
        />
        <br />
        <CancelIcon onClick={this.deleteWatch} />
      </div>
    );
  }
}

export default connect()(ProfileListItem);
