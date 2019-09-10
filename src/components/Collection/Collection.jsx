import React, { Component } from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../CollectionItem/CollectionItem';

class Collection extends Component {
  //Load Profile Collection on page load
  componentDidMount() {
    this.getCollection();
  }

  getCollection() {
    this.props.dispatch({
      type: 'FETCH_COLLECTION'
    });
  }

  render() {
    //for each item in redux state.watch
    //render a CollectionItem for that watch
    let CollectionList = this.props.watches.map((watch, i) => {
      return <CollectionItem key={i} watch={watch} />;
    });
    return <div class="Collection">{CollectionList}</div>;
  }
}

const mapStateToProps = state => ({
  watches: state.watch
});

export default connect(mapStateToProps)(Collection);
