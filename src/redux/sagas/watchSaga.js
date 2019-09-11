import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_WATCHES" actions
function* fetchWatches(action) {
  try {
    let response = yield axios.get('/api/watch/queue');
    console.log('Saga search response:', response.data);
    yield put({
      type: 'SET_WATCHES',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in watchSaga GET (Queue):', err);
  }
}

//worker Saga: will be fired on "ADD_WATCH" actions
function* addWatch(action) {
  try {
    let watch = action.payload;
    yield axios.post('/api/watch', watch);
    yield put({
      type: 'FETCH_WATCHES'
    });
  } catch (err) {
    console.log('Error in watchSaga POST:', err);
  }
}

//worker Saga: will be fired on "DELETE_WATCH" actions
function* deleteWatch(action) {
  try {
    let id = action.payload;
    yield axios.delete(`./api/watch/${id}`);
    yield put({
      type: 'FETCH_WATCHES'
    });
  } catch (err) {
    console.log('Error in watchSaga DELETE:', err);
  }
}

//worker Saga: will be fired on "UPDATE_COMPLETED" actions
function* updateCompleted(action) {
  try {
    let id = action.payload;
    yield axios.put(`./api/watch/completed/${id}`);
    yield put({
      type: 'FETCH_WATCHES'
    });
  } catch (err) {
    console.log('Error in watchSaga PUT (completed):', err);
  }
}

//worker Saga: will be fired on "FETCH_PROFILE" actions
function* fetchProfile(action) {
  try {
    let response = yield axios.get('/api/watch/profile');
    console.log('Saga search response:', response.data);
    yield put({
      type: 'SET_PROFILE',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in watchSaga GET (Profile):', err);
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
  yield takeLatest('FETCH_WATCHES', fetchWatches);
  yield takeLatest('ADD_WATCH', addWatch);
  yield takeLatest('DELETE_WATCH', deleteWatch);
  yield takeLatest('UPDATE_COMPLETED', updateCompleted);
  yield takeLatest('FETCH_PROFILE', fetchProfile);
  yield takeLatest('UPDATE_RATING', updateRating);
}

export default watchSaga;
