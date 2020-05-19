import * as actions from "../constants/gameConstants";
import gameHub from "../SignalRHelpers/GameHub";

const initialState = {
    games: [],
    game: {},
    players: [],
    isTurn: false,
    pending: false,
    activePlayer: '',
    winner: "",
    winnerCards: [],
    gameHub: gameHub,
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
        case actions.CHECK_USER_TURN_PENDING:
            return {
                ...state,
                pending: true,
            };
        case actions.CHECK_USER_TURN_SUCCESS:
            return {
                ...state,
                pending: false,
                isTurn: action.isTurn,
            };
        case actions.CHECK_USER_TURN_FAILURE:
            return {
                ...state,
                error: action.error,
                pending: false,
            };
        case actions.JOIN_GAME_PENDING:
            return {
                ...state,
                pending: true,
                error: null,
            };
        case actions.JOIN_GAME_SUCCESS:
            return {
                ...state,
                pending: false,
                game: action.game,
            };
        case actions.JOIN_GAME_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.playerName],
            };
        case actions.REMOVE_PLAYER:
            return {
                ...state,
                players: state.players.filter(player => player !== action.playerName),
            };
        case actions.UPDATE_PLAYERS:
            return {
                ...state,
                players: state.players.concat(action.players.filter(player => !state.players.includes(player))),
            };
        case actions.RESET_PLAYERS:
            return {
                ...state,
                players: [],
            };
        case actions.SET_WINNER:
            return {
                ...state,
                winner: action.name,  
            };
        case actions.SET_WINNER_CARDS:
            return {
                ...state,
                winnerCards: action.cards,
            };
        case actions.RESET_GAME:
            return {
                ...state,
                isTurn: false,
                activePlayer: '',
            };
        case actions.GET_ACTIVE_PLAYER_PENDING:
            return {
                ...state,
                pending: true,
            };
        case actions.GET_ACTIVE_PLAYER_SUCCESS:
            return {
                ...state,
                pending: false,
                activePlayer: action.activePlayer,
                error: null,
            };
        case actions.GET_ACTIVE_PLAYER_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.START_GAME_HUB:
            return {
                ...state,
                gameHub: action.gameHub,
            };
        default:
            return state;
    }
    
}