
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { CREATE_GAME, RENDER_GAME } from '../actions/gameActions';


export function* createGame() {
    
}

export function* loadGame() {
    
}

export default function* rootSaga() {
    yield all([loadGame()]);
};
