import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//MATERIAL-UI IMPORTS
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField, Divider } from '@material-ui/core';
import { AccountCircle, People } from '@material-ui/icons';

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

        <div className="FriendSearchList">{friendSearchList}</div>
        
        <div className="FriendSearchForm">
          <FormControl>
            <TextField
              onChange={this.setSearchName}
              id="friend-search"
              label="Search username..."
              value={this.state.searchName}
              type="search"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <People />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  findUser: state.findUser
});

export default withRouter(connect(mapStateToProps)(FriendSearch));
