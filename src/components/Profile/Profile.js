import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './Profile.css';

//COMPONENT IMPORTS
import ProfileItem from '../ProfileItem/ProfileItem';

class Profile extends Component {
  //Load User Profile on page load
  componentDidMount() {
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

    return (
      <div className="Profile">
        <div>
          <h1 id="welcome">{this.props.user.username}</h1>
        </div>
        <div className="ProfileList">{profileList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  watches: state.profile
});

export default connect(mapStateToProps)(Profile);
