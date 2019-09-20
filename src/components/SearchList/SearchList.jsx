import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as MovieSvg } from './movie.svg';

//COMPONENT IMPORTS
import SearchItem from '../SearchItem/SearchItem';

class SearchList extends Component {
  showPlaceholder() {
    if (this.props.search.length < 1) {
      return (
        <div className="search-placeholder">
          <MovieSvg
            style={{ width: '150px', height: '150px' }}
            className="placeholder-icon"
          />
          <br />
          <h2>Search Movies & TV Shows</h2>
        </div>
      );
    }
  }

  render() {
    let searchList = this.props.search.slice(0, 6).map((watch, i) => {
      return <SearchItem key={i} watch={watch} />;
    });

    return (
      <div>
        {this.showPlaceholder()}
        <div className="SearchList">{searchList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(SearchList);
