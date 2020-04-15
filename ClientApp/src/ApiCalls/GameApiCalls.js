import Axios from "axios";
import {addGamePending, addGameSuccess, addGameFailure} from '../actions/gameActions';

function addGame(userId) {
    console.log("Here");
    return dispatch => {
        dispatch(addGamePending());
        Axios.post("/api/game", {
            userId: userId,
        })
            .then(res => {
                dispatch(addGameSuccess(res.data));
            })
            .catch(error => {
                dispatch(addGameFailure(error));
            });
    }
}


export default {
    addGame,
}