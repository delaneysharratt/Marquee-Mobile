import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchListItem extends Component {
  render() {
    return (
      <div key={this.props.watch.title}>
        <img
          className="Poster"
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w92/${this.props.watch.poster_path}`}
        />
        <br />
      </div>
    );
  }
}

export default connect()(SearchListItem);
