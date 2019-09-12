import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import ProfileItem from '../ProfileItem/ProfileItem';

class ProfileList extends Component {
  //Load User Profile on page load
  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    this.props.dispatch({
      type: 'FETCH_WATCHES'
    });
    this.props.dispatch({
      type: 'FETCH_PROFILE'
    });
  }

  render() {
    //for each item in redux state.watch
    //render a ProfileItem for that watch
    let profileList = this.props.watches.map((watch, i) => {
      return <ProfileItem key={i} watch={watch} />;
    });
    return <div className="ProfileList">{profileList}</div>;
  }
}

const mapStateToProps = state => ({
  watches: state.profile
});

export default connect(mapStateToProps)(ProfileList);
