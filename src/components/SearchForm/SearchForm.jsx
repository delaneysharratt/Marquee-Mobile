import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import TextField from '@material-ui/core/TextField';

class Search extends Component {
  constructor(props) {
    super(props);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  state = {
    searchTerm: '',
    typing: false,
    typingTimeout: 0
  };

  fetchSearch = event => {
    if (this.state.searchTerm !== '') {
      this.props.dispatch({
        type: 'FETCH_SEARCH',
        payload: this.state.searchTerm
      });
    } else {
      this.props.dispatch({
        type: 'CLEAR_SEARCH',
        payload: this.state.searchTerm
      });
    }
  };

  setSearchTerm = event => {
    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      searchTerm: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function() {
        self.fetchSearch(self.state.searchTerm);
      }, 300)
    });
  };

  render() {
    return (
      <div className="Search">
        <TextField
          onChange={this.setSearchTerm}
          id="standard-search"
          label="Search movies..."
          value={this.state.searchTerm}
          type="search"
          margin="normal"
        />
      </div>
    );
  }
}

export default connect()(Search);
