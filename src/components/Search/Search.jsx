import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import SearchForm from '../SearchForm/SearchForm';
import SearchList from '../SearchList/SearchList';

class Search extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <SearchList />
      </div>
    );
  }
}

export default connect()(Search);
