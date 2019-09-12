import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { TextField } from '@material-ui/core';

class FriendSearch extends Component {
  constructor(props) {
    super(props);
    this.setSearchName = this.setSearchName.bind(this);
  }

  state = {
    searchName: '',
    typing: false,
    typingTimeout: 0
  };

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

  render() {
    return (
      <div className="FriendSearch">
        <TextField
          onChange={this.setSearchName}
          id="friend-search"
          label="Search for friends..."
          value={this.state.searchName}
          type="search"
          margin="normal"
        />
      </div>
    );
  }
}

export default connect()(FriendSearch);
