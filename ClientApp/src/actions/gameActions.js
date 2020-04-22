

import * as gameConstants from "../constants/gameConstants";
import Axios from "axios";
import {getSelectedPlayerCards} from "./cardActions";

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

export const addGame = (user, token) => {
    return async dispatch => {
        try {
            dispatch(addGamePending());
            const {data} = await Axios.post("/api/game", {
                userId: user.sub,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(addGameSuccess(data));
            dispatch(checkUserTurn({
                userId: user.sub,
                token,
                gameId: data.id,
            }));
            window.gameHub.joinGame(data.name, user.name);
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
                userId: payload.user.sub,
                token: payload.token,
            }));
            window.gameHub.joinGame(payload.game.name, payload.user.name);
            dispatch(getSelectedPlayerCards({
                token: payload.token,
                gameId: payload.game.id,
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
                    userId: payload.user.sub,
                    gameName: payload.gameName,
                }
            });
            dispatch(joinGameSuccess(data));
            window.gameHub.joinGame(data.name, payload.user.name);
            dispatch(getSelectedPlayerCards({
                token: payload.token,
                gameId: data.id,
            }));
            dispatch(checkUserTurn({
                token: payload.token,
                userId: payload.user.sub,
                gameId: data.id,
            }));
        } catch (error)
        {
            dispatch(joinGameFailure(error));
        }
    }
};

// add players to game
export function addPlayerAction(playerName) {
    return {
        type: gameConstants.ADD_PLAYER,
        playerName,
    }
}

export const addPlayer = (playerName) => {
  return async dispatch => {
      dispatch(addPlayerAction(playerName));
  } 
};

// REMOVE player from game
export function removePlayerAction(playerName) {
    return {
        type: gameConstants.REMOVE_PLAYER,
        playerName,
    }
}

export const removePlayer = (playerName) => {
    return async dispatch => {
        dispatch(removePlayerAction(playerName));
    }
};

// UPDATE players for game
export function updatePlayersAction(players) {
    return {
        type: gameConstants.UPDATE_PLAYERS,
        players,
    }
}

export const updatePlayers = (players) => {
    return async dispatch => {
        dispatch(updatePlayersAction(players));
    } 
};

// RESET players for game
export function resetPlayersAction() {
    return {
        type: gameConstants.RESET_PLAYERS,
    }
}

export const resetPlayers = () => {
    return async dispatch => {
        dispatch(resetPlayersAction());      
    }
};

// SET winner for game
export function setWinnerAction(name) {
    return {
        type: gameConstants.SET_WINNER,
        name,
    }
}

export const setWinner = (name) => {
    return async dispatch => {
        dispatch(setWinnerAction(name));
    } 
};

// RESET game for next round
export function resetGameAction() {
    return {
        type: gameConstants.RESET_GAME,
    }
}

export const resetGame = () => {
    return async dispatch => {
        dispatch(resetGameAction());      
    }
};