import { combineReducers } from 'redux'
import gameReducer from "./gameReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    gameReducer,
    authReducer,
});

export default rootReducer;