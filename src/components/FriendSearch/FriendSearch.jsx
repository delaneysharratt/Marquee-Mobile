import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//MATERIAL-UI IMPORTS
import { TextField, Divider } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

class FriendSearch extends Component {
  constructor(props) {
    super(props);
    this.setSearchName = this.setSearchName.bind(this);
  }

  //Reset search form on page load
  componentDidMount() {
    this.clearSearch();
  }

  state = {
    searchName: '',
    typing: false,
    typingTimeout: 0
  };

  clearSearch() {
    this.props.dispatch({
      type: 'CLEAR_USER_SEARCH'
    });
  }

  findUsers = event => {
    this.props.dispatch({
      type: 'FETCH_USER_SEARCH',
      payload: this.state.searchName
    });
  };

  setSearchName = event => {
    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      searchName: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function() {
        self.findUsers(self.state.searchName);
      }, 300)
    });
  };

  seeFriend = friend => {
    this.props.dispatch({
      type: 'SELECT_USER',
      payload: friend
    });
    this.props.history.push(`/${friend.username}`);
  };

  render() {
    //for each item in redux state.findUser
    //render a friend search list item for that user
    let friendSearchList = this.props.findUser.map((friend, i) => {
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
      <div className="FriendSearch">
        <div className="FriendSearchForm">
          <TextField
            onChange={this.setSearchName}
            id="friend-search"
            label="Search for friends..."
            value={this.state.searchName}
            type="search"
            margin="normal"
          />
        </div>
        {friendSearchList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  findUser: state.findUser
});

export default withRouter(connect(mapStateToProps)(FriendSearch));
