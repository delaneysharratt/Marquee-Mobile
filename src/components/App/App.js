import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Header from '../Header/Header';
import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Discover from '../Discover/Discover';
import Profile from '../Profile/Profile';
import Queue from '../Queue/Queue';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
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
            <ProtectedRoute
              exact
              path="/discover"
              component={Discover}
            />
            <ProtectedRoute
              exact
              path="/queue"
              component={Queue}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Nav />
        </div>
      </Router>
  )}
}

export default connect()(App);
