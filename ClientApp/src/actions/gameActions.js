

import { 
    ADD_GAME_PENDING, 
    ADD_GAME_SUCCESS, 
    ADD_GAME_FAILURE, 
    FETCH_GAMES_PENDING, 
    FETCH_GAMES_SUCCESS, 
    FETCH_GAMES_FAILURE, 
    SET_GAME 
} from "../constants/gameConstants";
import Axios from "axios";

// ADDING GAMES
export function addGamePending() {
    return {
        type: ADD_GAME_PENDING
    }
}

export function addGameSuccess(game) {
    return {
        type: ADD_GAME_SUCCESS,
        game: game
    }
}

export function addGameFailure(error) {
    return {
        type: ADD_GAME_FAILURE,
        error: error
    }
}

export const addGame = (userId, token) => {
    return async dispatch => {
        try {
            dispatch(addGamePending());
            const {data} = await Axios.post("/api/game", {
                userId,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(addGameSuccess(data));
        } catch (error) {
            console.error(error);
            dispatch(addGameFailure(error));
        }
    }
};

// Set Game
export function setGame(game) {
    return {
        type: SET_GAME,
        game: game,
    }
}

export const selectGame = (game) => {
    return dispatch => {
        dispatch(setGame(game));
    }
};


// fetching games
export function fetchGamesPending() {
    return {
        type: FETCH_GAMES_PENDING
    }
}

export function fetchGamesSuccess(games) {
    return {
        type: FETCH_GAMES_SUCCESS,
        games: games
    }
}

export function fetchGamesFailure(error) {
    return {
        type: FETCH_GAMES_FAILURE,
        error: error
    }
}

export const fetchGames = (userId, token) => {
    return async dispatch => {
        try {
            dispatch(fetchGamesPending());

            const {data} = await Axios.get("/api/game", {
                params: {
                    userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(fetchGamesSuccess(data));
        } catch (error) {
            console.error(error);
            dispatch(fetchGamesFailure(error));
        }
    }
};


//
// export function removeGame(payload) {
//     return {
//         type: REMOVE_GAME,
//         payload,
//     }
// }
//
// export function getGame(payload) {
//     return {
//         type: GET_GAME,  
//         payload
//     };
// }


export default {
    addGamePending,
    addGameSuccess,
    addGameFailure,
    addGame,
}