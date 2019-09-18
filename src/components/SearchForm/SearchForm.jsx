import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

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
      this.setState({
        searchTerm: ''
      });
    } else {
      this.props.dispatch({
        type: 'CLEAR_SEARCH'
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
        <FormControl>
          <TextField
            onChange={this.setSearchTerm}
            id="searchWatches"
            label="Search show title..."
            value={this.state.searchTerm}
            type="search"
            margin="normal"
            onKeyPress={this.handleEnter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
      </div>
    );
  }
}

export default connect()(Search);
