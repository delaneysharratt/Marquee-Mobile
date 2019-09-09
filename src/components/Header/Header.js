import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

const Header = props => (
  <div className="header">
    <Link to="/discover">
      <h2 className="header-title">marquee</h2>
    </Link>
    <div className="header-right">
      <Link className="header-link" to="/discover">
        {/* Show this link if they are logged in or not,
        but call this link 'Logout' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? (
          <span onClick={() => props.dispatch({ type: 'LOGOUT' })}>
            Log Out
          </span>
        ) : (
          'Login / Register'
        )}
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Header);