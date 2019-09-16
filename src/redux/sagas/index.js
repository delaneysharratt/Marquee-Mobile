import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';

//component view sagas
import discoverSaga from './discoverSaga';
import searchSaga from './searchSaga';
import queueSaga from './queueSaga';
import profileSaga from './profileSaga';
import findUser from './findUserSaga';
import friendSaga from './friendSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    // views
    discoverSaga(),
    searchSaga(),
    queueSaga(),
    profileSaga(),
    findUser(),
    friendSaga()
  ]);
}
