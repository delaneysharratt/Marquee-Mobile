import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//STYLING IMPORTS
import './FriendList.css';

//COMPONENT IMPORTS
import FriendSearch from '../FriendSearch/FriendSearch';

//MATERIAL-UI IMPORTS
import { Divider } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

class FriendList extends Component {
  //Load friend list on page load
  componentDidMount() {
    this.getFriends();
  }

  getFriends() {
    this.props.dispatch({
      type: 'FETCH_FRIEND_LIST'
    });
  }

  seeFriend = friend => {
    this.props.history.push(`/${friend.username}`);
  };

  render() {
    //for each item in redux state.friends
    //render a FriendItem for that user
    let friendList = this.props.friends.map((friend, i) => {
      return (
        <div
          key={i}
          className="FriendItem"
          onClick={() => this.seeFriend(friend)}
        >
          <AccountCircle fontSize="large" />
          {friend.username}
          <Divider />
        </div>
      );
    });

    return (
      <div className="FriendList">
        {friendList}
        <div className="FriendSearch">
          <FriendSearch />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends
});

export default withRouter(connect(mapStateToProps)(FriendList));
