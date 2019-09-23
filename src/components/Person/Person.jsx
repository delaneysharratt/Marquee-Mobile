import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//STYLING IMPORTS
import './Person.css';

//COMPONENT IMPORTS
import PersonItem from '../PersonItem/PersonItem';

//MATERIAL-UI IMPORTS
import { PersonAdd } from '@material-ui/icons';

//DIALOG BOX ON ADD FRIEND
import Swal from 'sweetalert2';

class Friend extends Component {
  state = {
    username: this.props.match.params.username
  };

  //Load Friend Profile on page load
  componentDidMount() {
    this.getFriend();
  }

  getFriend() {
    this.props.dispatch({
      type: 'FETCH_FRIEND',
      payload: this.state.username
    });
  }

  addFriend = () => {
    console.log('Adding friend...');
    this.props.dispatch({
      type: 'ADD_FRIEND',
      payload: this.props.selected
    });
    Swal.fire({
      type: 'success',
      title: 'Friend added!',
      showConfirmButton: false,
      timer: 1000
    });
  };

  render() {
    //for each item in redux state.watch
    //render a FriendItem for that watch
    let personWatchList = this.props.friend.map((watch, i) => {
      return <PersonItem key={i} watch={watch} />;
    });

    return (
      <div className="Person">
        <div className="person-header">
          <h1 className="person-username">{this.state.username}</h1>
          <PersonAdd onClick={this.addFriend} fontSize="large" />
        </div>
        <div className="person-watch-list">{personWatchList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friend: state.friend,
  selected: state.selected
});

export default withRouter(connect(mapStateToProps)(Friend));
