import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { AddCircle } from '@material-ui/icons';

class SearchItem extends Component {
  state = {
    watch: {
      title: this.props.watch.title,
      poster: this.props.watch.poster_path,
      backdrop: this.props.watch.backdrop_path,
      imdb_id: this.props.watch.imdb
    }
  };

  componentDidMount() {
    let title = '';
    if (this.props.watch.title) {
      title = this.props.watch.title;
    } else {
      title = this.props.watch.name;
    }
    this.setState({
      watch: {
        ...this.state.watch,
        title: title
      }
    });
  }

  addWatch = event => {
    console.log('Adding to Queue...');
    this.props.dispatch({
      type: 'ADD_WATCH',
      payload: this.state.watch
    });
    this.props.dispatch({
      type: 'CLEAR_SEARCH',
      payload: this.state.searchTerm
    });
  };

  render() {
    return (
      <div key={this.props.watch.title} className="Poster">
        <img
          alt={this.props.watch.title}
          src={`https://image.tmdb.org/t/p/w92/${this.props.watch.poster_path}`}
        />
        <br />
        <AddCircle onClick={this.addWatch} fontSize="small" />
      </div>
    );
  }
}

export default connect()(SearchItem);
