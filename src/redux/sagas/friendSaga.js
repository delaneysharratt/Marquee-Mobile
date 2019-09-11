import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_SEARCH" actions
function* fetchFriends(action) {
  try {
    let response = yield axios.get(`/api/friend`);
    console.log('Saga response:', response.data);
    yield put({
      type: 'SET_FRIENDS',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in friendSaga GET', err);
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIENDS', fetchFriends);
}

export default friendSaga;
