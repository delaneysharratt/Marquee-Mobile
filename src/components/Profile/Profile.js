import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './Profile.css';

//COMPONENT IMPORTS
import Collection from '../Collection/Collection';

class Profile extends Component {
  render() {
    return (
      <div class="Profile">
        <div>
          <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        </div>
        <Collection />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);
