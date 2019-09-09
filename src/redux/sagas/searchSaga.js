import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_SEARCH" actions
function* fetchSearch(action) {
  try {
    let searchTerm = action.payload;
    let response = yield axios.get(`/api/search/${searchTerm}`);
    console.log('Saga search response:', response.data);
    yield put({
      type: 'SET_SEARCH',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in searchSaga GET', err);
  }
}

function* searchSaga() {
  yield takeLatest('FETCH_SEARCH', fetchSearch);
}

export default searchSaga;
