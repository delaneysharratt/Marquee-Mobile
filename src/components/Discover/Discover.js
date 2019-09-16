import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './Discover.css';

class Discover extends Component {
  //Load Discover on page load
  componentDidMount() {
    this.getDiscover();
  }

  getDiscover() {
    this.props.dispatch({
      type: 'FETCH_DISCOVER'
    });
  }

  render() {
    let recommendations = this.props.discover.map((watch, i) => {
      return (
        <img
          key={watch.id}
          alt={watch.title}
          src={`https://image.tmdb.org/t/p/w500/${watch.backdrop}`}
        />
      );
    });

    return <div className="Discover">{recommendations}</div>;
  }
}

const mapStateToProps = state => ({
  discover: state.discover
});

export default connect(mapStateToProps)(Discover);
