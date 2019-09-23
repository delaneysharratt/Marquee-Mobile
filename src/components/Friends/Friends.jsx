import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//STYLING IMPORTS
import './Friends.css';

//COMPONENT IMPORTS
import FriendSearch from '../FriendSearch/FriendSearch';

//MATERIAL-UI IMPORTS
import { Divider } from '@material-ui/core';
import { AccountCircle, Cancel as Delete } from '@material-ui/icons';

//DIALOG BOX ON DELETE
import Swal from 'sweetalert2';

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

  deleteAlert = friendId => {
    //dialog box confirmation
    Swal.fire({
      title: 'Are you sure you want to remove this friend?',
      text: "You won't be able to undo this action!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, please delete!'
    }).then(result => {
      if (result.value) {
        Swal.fire(
          'Friend removed!',
          'This person will no longer be included in your list of friends.',
          'success'
        );
        this.deleteFriend(friendId);
      }
    });
  };

  deleteFriend = friendId => {
    console.log('Deleting user from friend list...');
    this.props.dispatch({
      type: 'DELETE_FRIEND',
      payload: friendId
    });
  };

  render() {
    //for each item in redux state.friends
    //render a friend list item for that user
    let friendList = this.props.friends.map((friend, i) => {
      return (
        <div key={i} className="friend-item">
          <div
            className="friend-account"
            onClick={() => this.seeFriend(friend)}
          >
            <AccountCircle />
            <span className="friend-name">{friend.username}</span>
          </div>

          <div className="friend-delete">
            <Delete onClick={() => this.deleteAlert(friend.friend_id)} />
          </div>
          <div className="divider">
            <Divider />
          </div>
        </div>
      );
    });

    return (
      <div className="Friends">
        <div className="friend-list">{friendList}</div>
        <div className="divider">
          <Divider />
        </div>
        <FriendSearch />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friendList
});

export default withRouter(connect(mapStateToProps)(FriendList));
