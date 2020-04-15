﻿
import * as actions from "../constants/gameConstants";

const initialState = {
    games: [],
    game: {},
    pending: false,
    error: null,
};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case actions.ADD_GAME_PENDING: 
            return {
                ...state,
                pending: true
            };
        case actions.ADD_GAME_SUCCESS:
            return {
                ...state,
                pending: false,
                games: [...state.games, action.game],
                game: action.game,
                error: null,
            };
        case actions.ADD_GAME_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.FETCH_GAMES_PENDING:
            return {
                ...state,
                pending: true,
            };
        case actions.FETCH_GAMES_SUCCESS:
            return {
                ...state,
                games: action.games,
                pending: false,
                error: null,
            };
        case actions.FETCH_GAMES_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case actions.SET_GAME:
            return {
                ...state,
                game: action.game,
            };
        default:
            return state;
    }
    
}

export const getGame = state => state.game;
export const getGamePending = state => state.pending;
export const getGameError = state => state.error;