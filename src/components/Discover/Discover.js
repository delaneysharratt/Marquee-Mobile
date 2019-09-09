import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import Search from '../Search/Search';

class Discover extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <GIFGalleryList />
      </div>
    );
  }
}

export default connect()(Discover);
