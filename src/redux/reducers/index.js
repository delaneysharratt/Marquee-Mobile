import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';

import search from './searchReducer';
import queue from './queueReducer';
import profile from './profileReducer';

import friendList from './friendListReducer';
import findUser from './findUserReducer';
import friend from './friendReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in

  search, //will contain the results of API search
  queue, //will contain all the watches added to a user's queue
  profile, //will contain all of a user's completed watches on profile

  friendList, //will contain all of a user's added friends
  findUser, // will contain all user search results from friend search
  friend //will contain all of a friend's watches
});

export default rootReducer;
