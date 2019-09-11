import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import FriendItem from '../FriendItem/FriendItem';

class FriendList extends Component {
  //Load friend list on page load
  componentDidMount() {
    this.getFriends();
  }

  getFriends() {
    this.props.dispatch({
      type: 'FETCH_FRIENDS'
    });
  }

  render() {
    //for each item in redux state.friends
    //render a FriendItem for that user
    let friendList = this.props.friends.map((friend, i) => {
      return <FriendItem key={i} friend={friend} />;
    });
    return (
      <div className="FriendList">
        <h1>Your FriendList</h1>
        {friendList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends
});

export default connect(mapStateToProps)(FriendList);
