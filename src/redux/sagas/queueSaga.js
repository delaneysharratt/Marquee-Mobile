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
    console.log('Error in queueSaga GET:', err);
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
    console.log('Error in queueSaga POST:', err);
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
    console.log('Error in queueSaga DELETE:', err);
  }
}

//worker Saga: will be fired on "UPDATE_PRIORITY" actions
function* updatePriority(action) {
  try {
    let id = action.payload.id;
    yield axios.put(`./api/watch/priority/${id}`, action.payload);
    yield put({
      type: 'FETCH_WATCHES'
    });
  } catch (err) {
    console.log('Error in queueSaga PUT (priority):', err);
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
    console.log('Error in queueSaga PUT (completed):', err);
  }
}

function* queueSaga() {
  yield takeLatest('FETCH_WATCHES', fetchWatches);
  yield takeLatest('ADD_WATCH', addWatch);
  yield takeLatest('DELETE_WATCH', deleteWatch);
  yield takeLatest('UPDATE_PRIORITY', updatePriority);
  yield takeLatest('UPDATE_COMPLETED', updateCompleted);
}

export default queueSaga;
