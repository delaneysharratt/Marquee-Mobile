import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_USER_SEARCH" actions
function* fetchUserSearch(action) {
  try {
    let searchName = action.payload;
    let response = yield axios.get(`/api/friend/search/${searchName}`);
    console.log('Saga user search response:', response.data);
    yield put({
      type: 'SET_USER_SEARCH',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in findUserSaga GET', err);
  }
}

function* findUserSaga() {
  yield takeLatest('FETCH_USER_SEARCH', fetchUserSearch);
}

export default findUserSaga;
