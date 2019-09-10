import React, { Component } from 'react';
import { connect } from 'react-redux';

class Queue extends Component {
  render() {
    return (
      <div key={this.props.watch.id} className="Poster">
        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w92/${this.props.watch.poster}`}
        />
      </div>
    );
  }
}

export default connect()(Queue);
