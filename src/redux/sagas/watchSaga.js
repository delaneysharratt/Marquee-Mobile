import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_WATCHES" actions
function* fetchWatches(action) {
    try {
        let response = yield axios.get('/api/watch/');
        console.log('Saga search response:', response.data);
        yield put({
            type: 'SET_WATCHES',
            payload: response.data
        });
    } catch (err) {
        console.log('Error in watchSaga GET', err);
    }
}

//worker Saga: will be fired on "ADD_WATCH" actions
function* addWatch(action) {
    try {
        let watch = action.payload;
        yield axios.post('/api/watch', watch);
        yield put({
            type: 'SET_WATCHES'
        });
    } catch (err) {
        console.log('Error in watchSaga POST', err);
    }
}

function* watchSaga() {
    yield takeLatest('FETCH_WATCHES', fetchWatches);
    yield takeLatest('ADD_WATCH', addWatch);
}

export default watchSaga;