import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//STYLING IMPORTS
import './Friend.css';

//COMPONENT IMPORTS
import FriendItem from '../FriendItem/FriendItem';

//MATERIAL-UI IMPORTS
import { PersonAdd } from '@material-ui/icons';

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

  addFriend = () => {
    console.log('Adding friend...');
    this.props.dispatch({
      type: 'ADD_FRIEND',
      payload: this.props.selected
    });
  };

  render() {
    //for each item in redux state.watch
    //render a FriendItem for that watch
    let friendWatchList = this.props.friend.map((watch, i) => {
      return <FriendItem key={i} watch={watch} />;
    });

    return (
      <div className="Friend">
        <div className="FriendHeader">
          <h1>
            {this.state.username}
            <PersonAdd onClick={this.addFriend} fontSize="large" />
          </h1>
        </div>
        <div className="FriendWatchList">{friendWatchList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friend: state.friend,
  selected: state.selected
});

export default withRouter(connect(mapStateToProps)(Friend));
