import React, { Component } from 'react';
import { connect } from 'react-redux';
import movieSvg from './movie.svg';

//COMPONENT IMPORTS
import SearchItem from '../SearchItem/SearchItem';

//MATERIAL-UI IMPORTS
import IconButton from '@material-ui/core/IconButton';
// import { Theaters } from '@material-ui/icons';

class SearchList extends Component {
  showPlaceholder() {
    if (this.props.search.length < 1) {
      return (
        <div className="search-placeholder">
          <IconButton style={{ width: '125px', height: '125px' }}>
            {/* <Theaters fontSize="large" /> */}
            <img src={movieSvg} alt="" className="placeholder-icon" />
          </IconButton>
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
