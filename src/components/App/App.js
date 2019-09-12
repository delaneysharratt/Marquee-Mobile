import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

//STYLING IMPORTS
import './App.css';

//COMPONENT IMPORTS
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

//ROUTE COMPONENTS
import Discover from '../Discover/Discover';
import Search from '../Search/Search';
import Queue from '../Queue/Queue';
import Profile from '../Profile/Profile';
import FriendList from '../FriendList/FriendList';
import Friend from '../Friend/Friend';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/discover */}
            <Redirect exact from="/" to="/discover" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/discover will show the Discover if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/discover */}
            <ProtectedRoute exact path="/discover" component={Discover} />
            <ProtectedRoute exact path="/search" component={Search} />
            <ProtectedRoute exact path="/queue" component={Queue} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/friends" component={FriendList} />
            <ProtectedRoute exact path="/:username" component={Friend} />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Nav />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
