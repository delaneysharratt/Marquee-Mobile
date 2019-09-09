import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import SearchItem from '../SearchItem/SearchItem';

class SearchList extends Component {
  render() {
    let searchList = this.props.search.slice(0, 6).map((watch, i) => {
      return <SearchItem key={i} watch={watch} />;
    });

    return <div className="SearchList">{searchList}</div>;
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(SearchList);
