import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import TextField from '@material-ui/core/TextField';

class Search extends Component {
  state = {
    searchTerm: ''
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
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleEnter = event => {
    if (event.key === 'Enter') {
      this.fetchSearch();
    }
  };

  render() {
    return (
      <div className="SearchForm">
        <TextField
          onChange={this.setSearchTerm}
          id="searchWatches"
          label="Search movies..."
          value={this.state.searchTerm}
          type="search"
          margin="normal"
          onKeyPress={this.handleEnter}
        />
      </div>
    );
  }
}

export default connect()(Search);
