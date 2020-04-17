import { combineReducers } from 'redux'
import gameReducer from "./gameReducer";
import authReducer from "./authReducer";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
    gameReducer,
    authReducer,
    cardReducer,
});

export default rootReducer;