import * as actions from '../constants/cardConstants';
import {selectWhiteCard} from "../actions/cardActions";

const initialState = {
    blackCard: {},
    whiteCards: [],
    selectedCards: 0,
    playerSelectedCards: false,
    selectedPlayerCards: [],
    pending: false,
    error: null,  
};

export default function cardReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CARDS_PENDING:
            return {
                ...state,
                pending: true,
            };
        case actions.GET_CARDS_SUCCESS:
            return {
                ...state,
                whiteCards: action.cards.whiteCards,
                blackCard: action.cards.blackCard,
                pending: false,
            };
        case actions.GET_CARDS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.RESET_CARDS:
            return {
                ...state,
                whiteCards: [],
                blackCard: {},
                selectedCards: 0,
                playerSelectedCards: false,
                selectedPlayerCards: [],
            };
        case actions.SELECT_CARD:
            return {
                ...state,
                whiteCards: Object.assign([], selectWhiteCard(state.whiteCards, action.cardId)),
            };
        case actions.SET_SELECTED_CARD_COUNT:
            return {
                ...state,
                selectedCards: state.selectedCards += action.value,  
            };
        case actions.SEND_SELECTED_CARDS_PENDING:
            return {
                ...state,
                pending: true,
                error: null,
            };
        case actions.SEND_SELECTED_CARDS_SUCCESS:
            return {
                ...state,
                playerSelectedCards: action.playerSelectedCards,
                pending: false,
            };
        case actions.SEND_SELECTED_CARDS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.CHECK_ANY_CARDS_SELECTED_PENDING:
            return {
                ...state,
                pending: true,
                error: null,
            };
        case actions.CHECK_ANY_CARDS_SELECTED_SUCCESS:
            return {
                ...state,
                pending: false,
                playerSelectedCards: action.playerSelectedCards,
                error: null,
            };
        case actions.CHECK_ANY_CARDS_SELECTED_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.GET_SELECTED_PLAYER_CARDS_PENDING:
            return {
                ...state,
                pending: true,
                error: null,
            };
        case actions.GET_SELECTED_PLAYER_CARDS_SUCCESS:
            return {
                ...state,
                pending: false,
                selectedPlayerCards: action.selectedCards,
            };
        case actions.GET_SELECTED_PLAYER_CARDS_FAILURE:
            return {
                ...state,
                pending: false,
            };
        default:
            return state;
    }
};