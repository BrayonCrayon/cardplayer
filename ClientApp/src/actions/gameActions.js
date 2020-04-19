

import * as gameConstants from "../constants/gameConstants";
import Axios from "axios";

// ADDING GAMES
export function addGamePending() {
    return {
        type: gameConstants.ADD_GAME_PENDING
    }
}

export function addGameSuccess(game) {
    return {
        type: gameConstants.ADD_GAME_SUCCESS,
        game: game
    }
}

export function addGameFailure(error) {
    return {
        type: gameConstants.ADD_GAME_FAILURE,
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
            dispatch(checkUserTurn({
                userId,
                token,
                gameId: data.id,
            }))
        } catch (error) {
            console.error(error);
            dispatch(addGameFailure(error));
        }
    }
};

// Set Game
export function setGame(game) {
    return {
        type: gameConstants.SET_GAME,
        game: game,
    }
}

export const selectGame = (payload) => {
    return dispatch => {
        dispatch(setGame(payload.game));
        
        if (Object.keys(payload.game).length > 0)
        {
            dispatch(checkUserTurn({
                gameId: payload.game.id,
                userId: payload.userId,
                token: payload.token,
            }));
        }
    }
};


// fetching games
export function fetchGamesPending() {
    return {
        type: gameConstants.FETCH_GAMES_PENDING
    }
}

export function fetchGamesSuccess(games) {
    return {
        type: gameConstants.FETCH_GAMES_SUCCESS,
        games: games
    }
}

export function fetchGamesFailure(error) {
    return {
        type: gameConstants.FETCH_GAMES_FAILURE,
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

// Check user turn
export function checkUserTurnPending() {
    return {
        type: gameConstants.CHECK_USER_TURN_PENDING,
    }
}

export function checkUserTurnSuccess(isTurn) {
    return {
        type: gameConstants.CHECK_USER_TURN_SUCCESS,
        isTurn: isTurn,
    }
}

export function checkUserTurnFailure(error) {
    return {
        type: gameConstants.CHECK_USER_TURN_FAILURE,
        error: error,
    }
}

export const checkUserTurn = (payload) => {
    return async dispatch => {
        try {
            dispatch(checkUserTurnPending());
            const {data} = await Axios.get("/api/game/is-turn", {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
                params: {
                    userId: payload.userId,
                    gameId: payload.gameId,
                }
            });
            dispatch(checkUserTurnSuccess(data));
        }      
        catch (error) {
            dispatch(checkUserTurnFailure(error));
        }
    }
};

// Join game action
export function joinGamePending() {
    return {
        type: gameConstants.JOIN_GAME_PENDING
    }
}

export function joinGameSuccess(game) {
    return {
        type: gameConstants.JOIN_GAME_SUCCESS,
        game: game,
    }
}

export function joinGameFailure(error) {
    return {
        type: gameConstants.JOIN_GAME_FAILURE,
        error: error,
    }
}

export const joinGame = (payload) => {
    return async dispatch => {
        try {
            dispatch(joinGamePending());
            const {data} = await Axios.get(`/api/game/join`, {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
                params: {
                    userId: payload.userId,
                    gameName: payload.gameName,
                }
            });
            dispatch(joinGameSuccess(data));
        } catch (error)
        {
            dispatch(joinGameFailure(error));
        }
    }
};

export default {
    addGamePending,
    addGameSuccess,
    addGameFailure,
    addGame,
}