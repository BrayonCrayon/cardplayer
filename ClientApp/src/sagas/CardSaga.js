import { call, put, takeEvery } from 'redux-saga/effects';
// Effect creators are call, and put. They will return JS objects

export function* fetchData(action) {
    try {
        const data = yield call(Api.fetchUser, action.payload.url);
        yield put({type: "FETCH_SUCCEEDED", data});
    } catch (error) {
        yield put({type: "FETCH_FAILED", error});
    }
}

