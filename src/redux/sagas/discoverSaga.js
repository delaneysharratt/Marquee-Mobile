import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_DISCOVER" actions
function* fetchDiscover(action) {
  try {
    let response = yield axios.get('/api/discover');
    console.log('Saga response for Discover:', response.data);
    yield put({
      type: 'SET_DISCOVER',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in discoverSaga GET:', err);
  }
}

function* discoverSaga() {
  yield takeLatest('FETCH_DISCOVER', fetchDiscover);
}

export default discoverSaga;
