﻿import * as actions from '../constants/cardConstants';
import {selectWhiteCard} from "../actions/cardActions";

const initialState = {
    blackCard: {},
    whiteCards: [],
    selectedCardCount: 0,
    hasPlayerSelectedCards: false,
    playerSelectedCards: [],
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
                selectedCardCount: 0,
                hasPlayerSelectedCards: false,
                playerSelectedCards: [],
            };
        case actions.SELECT_CARD:
            return {
                ...state,
                whiteCards: Object.assign([], selectWhiteCard(state.whiteCards, action.cardId)),
            };
        case actions.SET_SELECTED_CARD_COUNT:
            return {
                ...state,
                selectedCardCount: state.selectedCardCount += action.value,  
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
                hasPlayerSelectedCards: action.value,
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
                hasPlayerSelectedCards: action.value,
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
                playerSelectedCards: action.cards,
            };
        case actions.GET_SELECTED_PLAYER_CARDS_FAILURE:
            return {
                ...state,
                pending: false,
            };
        case actions.REMOVE_USED_CARDS:
            return {
                ...state,
                whiteCards: state.whiteCards.filter(card => !action.cardIds.includes(card.id)),
            };
        case actions.DELETE_USED_CARDS_PENDING:
            return {
                ...state,
                pending: true,
            };
        case actions.DELETE_USED_CARDS_SUCCESS:
            return {
                ...state,
                pending: false,
                whiteCards: action.newCards,
            };
        case actions.DELETE_USED_CARDS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.SETUP_NEXT_ROUND_PENDING:
            return {
                ...state,
                pending: true,
            };
        case actions.SETUP_NEXT_ROUND_SUCCESS:
            return {
                ...state,
                pending: false,
                blackCard: action.newCards.blackCard,
                selectedCardCount: 0,
                hasPlayerSelectedCards: false,
                playerSelectedCards: [],
            };
        case actions.SETUP_NEXT_ROUND_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.GET_BLACK_CARD_PENDING:
            return {
                ...state,
                pending: true,
                error: null,
            };
        case actions.GET_BLACK_CARD_SUCCESS:
            return {
                ...state,
                pending: false,
                blackCard: action.blackCard,
            };
        case actions.GET_BLACK_CARD_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.error,
            };
        case actions.RESET_SELECTED_CARDS:
            return {
                ...state,
                playerSelectedCards: [],
            };
        case actions.REMOVE_SELECTED_CARDS:
            return {
                ...state,
                playerSelectedCards: state.playerSelectedCards.filter(whiteCard => !action.cardIds.includes(whiteCard.card.id)),  
            };
        default:
            return state;
    }
};