import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_PROFILE" actions
function* fetchProfile(action) {
  try {
    let response = yield axios.get('/api/watch/profile');
    console.log('Saga response for Profile:', response.data);
    yield put({
      type: 'SET_PROFILE',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in profileSaga GET:', err);
  }
}

//worker Saga: will be fired on "UPDATE_RATING" actions
function* updateRating(action) {
  try {
    let id = action.payload.id;
    yield axios.put(`./api/watch/rating/${id}`, action.payload);
    yield put({
      type: 'FETCH_PROFILE'
    });
  } catch (err) {
    console.log('Error in watchSaga PUT (rating):', err);
  }
}

function* watchSaga() {
  yield takeLatest('FETCH_PROFILE', fetchProfile);
  yield takeLatest('UPDATE_RATING', updateRating);
}

export default watchSaga;
