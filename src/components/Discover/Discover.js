import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//STYLING IMPORTS
import './Discover.css';

//MATERIAL-UI IMPORTS
import { Rating } from '@material-ui/lab';
import { AccountCircle, AddCircle } from '@material-ui/icons';

//DIALOG BOX ON ADD SHOW
import Swal from 'sweetalert2';

class Discover extends Component {
  //Load Discover on page load
  componentDidMount() {
    this.getDiscover();
  }

  getDiscover() {
    this.props.dispatch({
      type: 'FETCH_DISCOVER'
    });
  }

  seeFriend = username => {
    console.log('leaving to friend profile');

    this.props.history.push(`/${username.username}`);
  };

  addWatch = (event, watch) => {
    event.preventDefault();
    console.log('Adding recommendation to Queue...');
    //dialog box confirmation: success!
    this.addAlert();
    //send dispatch for POST
    this.props.dispatch({
      type: 'ADD_WATCH',
      payload: watch
    });
  };

  addAlert() {
    Swal.fire({
      type: 'success',
      title: 'Successfully added!',
      showConfirmButton: false,
      timer: 1000
    });
  }

  render() {
    let recommendations = this.props.discover.map((watch, i) => {
      return (
        <div className="recommendation" key={watch.id}>
          <img
            alt={watch.title}
            src={`https://image.tmdb.org/t/p/original/${watch.backdrop}`}
          />
          <div
            className="discover-rating"
            onClick={() => this.seeFriend(watch)}
          >
            <AccountCircle fontSize="small" className="friend-icon" />
            <span className="friend-username">{watch.username}</span>
            <div className="break"></div>
            <Rating
              name={watch.title}
              value={watch.rating}
              size="small"
              readOnly
            />
          </div>
          <h3 className="discover-title">{watch.title}</h3>
          <AddCircle
            onClick={event => this.addWatch(event, watch)}
            fontSize="large"
            className="add-button"
          />
        </div>
      );
    });

    return <div className="Discover">{recommendations}</div>;
  }
}

const mapStateToProps = state => ({
  discover: state.discover
});

export default withRouter(connect(mapStateToProps)(Discover));
