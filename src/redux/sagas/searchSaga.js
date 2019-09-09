import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_SEARCH" actions
function* fetchSearch(action) {
  try {
    let searchTerm = action.payload;
    let response = yield axios.get(`/movie/${searchTerm}`);
    console.log('saga search response', response.data);
    yield put({
      type: 'SET_SEARCH',
      payload: response.data
    });
  } catch (error) {
    console.log('error in client side search get', error);
  }
}

function* searchSaga() {
  yield takeLatest('FETCH_SEARCH', fetchSearch);
}

export default searchSaga;
