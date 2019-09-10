import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './Discover.css';

//COMPONENT IMPORTS
import Search from '../Search/Search';

class Discover extends Component {
  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default connect()(Discover);
