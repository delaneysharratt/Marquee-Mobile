import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { AccountCircle } from '@material-ui/icons';

class FriendItem extends Component {
  render() {
    return (
      <div className="FriendItem">
        <AccountCircle fontSize="large" />
        {this.props.friend.username}
      </div>
    );
  }
}

export default connect()(FriendItem);
