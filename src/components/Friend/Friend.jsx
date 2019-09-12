import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//STYLING IMPORTS
import './Friend.css';

//COMPONENT IMPORTS
import FriendItem from '../FriendItem/FriendItem';

//MATERIAL-UI IMPORTS
import { AccountCircle } from '@material-ui/icons';

class Friend extends Component {
  state = {
    username: this.props.match.params.username
  };

  //Load Friend Profile on page load
  componentDidMount() {
    this.getFriend();
  }

  getFriend() {
    this.props.dispatch({
      type: 'FETCH_FRIEND',
      payload: this.state.username
    });
  }

  render() {
    //for each item in redux state.watch
    //render a FriendItem for that watch
    let friendWatchList = this.props.friend.map((watch, i) => {
      return <FriendItem key={i} watch={watch} />;
    });

    return (
      <div className="Friend">
        <div className="FriendHeader">
          <h2><AccountCircle fontSize="large"/>{this.state.username}</h2>
        </div>
        <div className="FriendWatchList">{friendWatchList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friend: state.friend
});

export default withRouter(connect(mapStateToProps)(Friend));
