import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './Discover.css';

class Discover extends Component {
  state = {
    feature: []
  };

  //Load User Profile on page load
  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    this.props.dispatch({
      type: 'FETCH_PROFILE'
    });
  }

  render() {
    let feature = this.props.feature.slice(0, 3).map((watch, i) => {
      return (
        <img
          alt={watch.title}
          src={`https://image.tmdb.org/t/p/w500/${watch.backdrop}`}
        />
      );
    });

    return (
      <div className="Discover">
        {feature}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feature: state.profile
});

export default connect(mapStateToProps)(Discover);
