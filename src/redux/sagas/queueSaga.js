import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_WATCHES" actions
function* fetchWatches(action) {
  try {
    let response = yield axios.get('/api/watch/queue');
    console.log('Saga response for Queue:', response.data);
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

function* watchSaga() {
  yield takeLatest('FETCH_WATCHES', fetchWatches);
  yield takeLatest('ADD_WATCH', addWatch);
  yield takeLatest('DELETE_WATCH', deleteWatch);
  yield takeLatest('UPDATE_COMPLETED', updateCompleted);
}

export default watchSaga;
