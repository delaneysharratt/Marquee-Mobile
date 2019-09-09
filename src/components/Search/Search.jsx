import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Search.css';

//COMPONENT IMPORTS
import SearchForm from '../SearchForm/SearchForm';
import SearchList from '../SearchList/SearchList';

class Search extends Component {
  render() {
    return (
      <div className="Search">
        <SearchForm />
        <SearchList />
      </div>
    );
  }
}

export default connect()(Search);
