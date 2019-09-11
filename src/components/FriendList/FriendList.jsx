import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//MATERIAL-UI IMPORTS
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
        </div>
      );
    });

    return (
      <div className="FriendList">
        <h1>Your FriendList</h1>
        {friendList}
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends
});

export default withRouter(connect(mapStateToProps)(FriendList));
