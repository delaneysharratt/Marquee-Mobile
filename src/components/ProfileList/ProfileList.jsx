import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileListItem from '../ProfileListItem/ProfileListItem';

class ProfileList extends Component {
  //Load Profile Profile on page load
  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    this.props.dispatch({
      type: 'FETCH_PROFILE'
    });
  }

  render() {
    //for each item in redux state.watch
    //render a ProfileListItem for that watch
    let profileList = this.props.watches.map((watch, i) => {
      return <ProfileListItem key={i} watch={watch} />;
    });
    return <div class="ProfileList">{profileList}</div>;
  }
}

const mapStateToProps = state => ({
  watches: state.profile
});

export default connect(mapStateToProps)(ProfileList);
