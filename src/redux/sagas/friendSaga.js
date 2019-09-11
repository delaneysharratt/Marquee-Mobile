import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_FRIENDS" actions
function* fetchFriendList(action) {
  try {
    let response = yield axios.get(`/api/friend`);
    console.log('Saga response for Friends:', response.data);
    yield put({
      type: 'SET_FRIEND_LIST',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in friendSaga GET (list)', err);
  }
}

//worker Saga: will be fired on "FETCH_FRIEND" actions
function* fetchFriend(action) {
  try {
    let username = action.payload;
    let response = yield axios.get(`/api/friend/${username}`);
    console.log('Saga response for Friend watches:', response.data);
    yield put({
      type: 'SET_FRIEND',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in friendSaga GET (profile)', err);
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIEND_LIST', fetchFriendList);
  yield takeLatest('FETCH_FRIEND', fetchFriend);
}

export default friendSaga;
