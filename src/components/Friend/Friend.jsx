import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
// import ProfileItem from '../ProfileItem/ProfileItem';

//MATERIAL-UI IMPORTS
import { PersonAdd } from '@material-ui/icons';

class User extends Component {
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

  render() {
    console.log(this.state);

    return (
      <div className="Friend">
        <div>
          <h1 id="welcome">Welcome!</h1>
          <PersonAdd />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friend: state.friends
});

export default withRouter(connect(mapStateToProps)(User));
