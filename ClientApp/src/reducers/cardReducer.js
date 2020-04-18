import * as actions from '../constants/cardConstants';
import {selectWhiteCard} from "../actions/cardActions";

const initialState = {
    blackCard: {},
    whiteCards: [],
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
            };
        case actions.SELECT_CARD:
            selectWhiteCard(state.whiteCards, action.cardId);
            return state;
        default:
            return state;
    }
};