import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//COMPONENT IMPORTS
// import ProfileItem from '../ProfileItem/ProfileItem';

class User extends Component {
  //Load Friend Profile on page load
  componentDidMount() {
    this.getFriend();
  }

  getFriend() {
    let user = this.props.match.params;
    console.log(user);

    this.props.dispatch({
      type: 'FETCH_FRIEND',
      payload: user.username
    });
  }

  render() {
    return (
      <div className="Friend">
        <div>
          <h1 id="welcome">Welcome!</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friend: state.friends
});

export default withRouter(connect(mapStateToProps)(User));
