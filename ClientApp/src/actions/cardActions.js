import * as cardConstants from '../constants/cardConstants';
import Axios from "axios";
import {resetGame} from "./gameActions";
import store from "../store/configureStore";

export function getCardPending() {
    return {
        type: cardConstants.GET_CARDS_PENDING
    }
}

export function getCardSuccess(cards) {
    return {
        type: cardConstants.GET_CARDS_SUCCESS,
        cards: cards,
    }
}

export function getCardFailure(error) {
    return {
        type: cardConstants.GET_CARDS_FAILURE,
        error: error,
    }
}

export const getCards = (payload) => {
    return async dispatch => {

        if (Object.entries(store.getState().gameReducer.game).length === 0)
            return;

        try {
            dispatch(getCardPending());
            const {data} = await Axios.get("/api/cards", {
                params: {
                    userId: payload.userId,
                    gameId: payload.gameId,
                }
            });
            dispatch(getCardSuccess(data));
        } catch (error) {
            dispatch(getCardFailure(error));
        }
    }
};

// Reset cards
export function resetCardsAction() {
    return {
        type: cardConstants.RESET_CARDS,
    }
}

export const resetCards = () => {
    return async dispatch => {
        dispatch(resetCardsAction());
    }
};

// Select Card
export function selectCardAction(cardId) {
    return {
        type: cardConstants.SELECT_CARD,
        cardId: cardId,
    }
}

export const selectCards = (cardId) => {
    return async dispatch => {
        dispatch(selectCardAction(cardId));
    }
};

export const selectWhiteCard = (whiteCards, Id) => {
    whiteCards.forEach(card => {
        if (card.id === Id) {
            card.selected = !card.selected;
            return;
        }
    });
    return whiteCards;
};


// Increment selected card count

export function setSelectedCardCountAction(value) {
    return {
        type: cardConstants.SET_SELECTED_CARD_COUNT,
        value: value
    }
}

export const incrementSelectedCardCount = (value) => {
    return async dispatch => {
        dispatch(setSelectedCardCountAction(value));
    }
};

// Call api call to select cards

export function sendSelectedCardsPending() {
    return {
        type: cardConstants.SEND_SELECTED_CARDS_PENDING,
    };
}

export function sendSelectedCardsSuccess(value) {
    return {
        type: cardConstants.SEND_SELECTED_CARDS_SUCCESS,
        value,
    };
}

export function sendSelectedCardsFailure(error) {
    return {
        type: cardConstants.SEND_SELECTED_CARDS_FAILURE,
        error,
    };
}

export const sendSelectCards = (payload) => {
    return async dispatch => {
        try {
            dispatch(sendSelectedCardsPending());
            const {data} = await Axios.put(`/api/cards`, {
                cardIds: payload.cardIds,
                userId: payload.userId,
                gameId: payload.game.id,
            });

            if (data) {
                dispatch(sendSelectedCardsSuccess(data));
                await store.getState().gameReducer.gameHub.playerSelectedCardsNotify(payload.game.name);
            } else {
                dispatch(sendSelectedCardsFailure(data));
            }
        } catch (error) {
            dispatch(sendSelectedCardsFailure(error));
        }
    }
};


// Check if any cards were already selected 

export function checkAnyCardsSelectedPending() {
    return {
        type: cardConstants.CHECK_ANY_CARDS_SELECTED_PENDING
    };
}

export function checkAnyCardsSelectedSuccess(value) {
    return {
        type: cardConstants.CHECK_ANY_CARDS_SELECTED_SUCCESS,
        value,
    }
}

export function checkAnyCardsSelectedFailure(error) {
    return {
        type: cardConstants.CHECK_ANY_CARDS_SELECTED_FAILURE,
        error,
    }
}

export const checkAnyCardsSelected = (payload) => {
    return async dispatch => {
        try {
            dispatch(checkAnyCardsSelectedPending());
            const {data} = await Axios.get(`/api/cards/any-selected-cards`, {
                params: {
                    userId: payload.userId,
                    gameId: payload.gameId,
                }
            });
            dispatch(checkAnyCardsSelectedSuccess(data));
            if (data) {
                dispatch(getSelectedPlayerCards({
                    gameId: payload.gameId,
                }));
            }
        } catch (error) {
            dispatch(checkAnyCardsSelectedFailure(error));
        }
    }
};

// Get Player selected Cards
export function getSelectedPlayerCardsPending() {
    return {
        type: cardConstants.GET_SELECTED_PLAYER_CARDS_PENDING,
    }
}

export function getSelectedPlayerCardsSuccess(cards) {
    return {
        type: cardConstants.GET_SELECTED_PLAYER_CARDS_SUCCESS,
        cards
    }
}

export function getSelectedPlayerCardsFailure(error) {
    return {
        type: cardConstants.GET_SELECTED_PLAYER_CARDS_FAILURE,
        error,
    }
}

export const getSelectedPlayerCards = (payload) => {
    return async dispatch => {
        try {
            dispatch(getSelectedPlayerCardsPending());
            const {data} = await Axios.get(`/api/cards/selected-cards`, {
                params: {
                    gameId: payload.gameId,
                }
            });
            dispatch(getSelectedPlayerCardsSuccess(data));
        } catch (error) {
            dispatch(getSelectedPlayerCardsFailure(error));
        }
    }
};

// Delete used cards
export function deleteUsedCardsPending() {
    return {
        type: cardConstants.DELETE_USED_CARDS_PENDING,
    }
}

export function deleteUsedCardsSuccess(newCards) {
    return {
        type: cardConstants.DELETE_USED_CARDS_SUCCESS,
        newCards,
    }
}

export function deleteUsedCardsFailure(error) {
    return {
        type: cardConstants.DELETE_USED_CARDS_FAILURE,
        error,
    }
}

export const deleteUsedCards = (payload) => {
    return async dispatch => {
        if (payload.cardIds.length === 0)
            return;

        try {
            dispatch(deleteUsedCardsPending());
            const {data} = await Axios.post(`/api/cards/delete-used-cards`, {
                userId: payload.user.sub,
                cardIds: payload.cardIds,
                gameId: payload.gameId,
            });

            dispatch(removeUsedCards(payload.cardIds));
            dispatch(deleteUsedCardsSuccess(data));
        } catch (error) {
            dispatch(deleteUsedCardsFailure(error));
        }
    }
};

// Remove used cards from last round
export function removeUsedCardsAction(cardIds) {
    return {
        type: cardConstants.REMOVE_USED_CARDS,
        cardIds,
    }
}

export const removeUsedCards = (cardIds) => {
    return async dispatch => {
        dispatch(removeUsedCardsAction(cardIds));
    }
};

// Setup next round
export function setupNextRoundPending() {
    return {
        type: cardConstants.SETUP_NEXT_ROUND_PENDING,
    }
}

export function setupNextRoundSuccess(newCards) {
    return {
        type: cardConstants.SETUP_NEXT_ROUND_SUCCESS,
        newCards,
    }
}

export function setupNextRoundFailure(error) {
    return {
        type: cardConstants.SETUP_NEXT_ROUND_FAILURE,
        error,
    }
}

export const setupNextRound = (payload) => {
    return async dispatch => {
        try {
            dispatch(setupNextRoundPending());
            const {data} = await Axios.post(`/api/cards/setup-next-round`, {
                userId: payload.user.sub,
                gameId: payload.game.id,
                cardIds: [payload.blackCardId],
            });
            const winnerCards = store.getState().cardReducer
                .playerSelectedCards
                .filter(playerCard => playerCard.user.userName === payload.winner)
                .map(playerCard => playerCard.card.text);
            await store.getState().gameReducer.gameHub.tellPlayersTheWinner(payload.game.name, payload.winner, winnerCards);
            dispatch(setupNextRoundSuccess(data));
            dispatch(resetGame());
        } catch (error) {
            dispatch(setupNextRoundFailure(error));
        }
    }
};

// Get black card
export function getBlackCardPending() {
    return {
        type: cardConstants.GET_BLACK_CARD_PENDING,
    }
}

export function getBlackCardSuccess(blackCard) {
    return {
        type: cardConstants.GET_BLACK_CARD_SUCCESS,
        blackCard,
    }
}

export function getBlackCardFailure(error) {
    return {
        type: cardConstants.GET_BLACK_CARD_FAILURE,
        error,
    }
}

export const getBlackCard = (payload) => {
    return async dispatch => {
        try {
            dispatch(getBlackCardPending());
            const {data} = await Axios.get(`/api/cards/black-card`, {
                params: {
                    gameId: payload.gameId,
                }
            });
            dispatch(getBlackCardSuccess(data));
        } catch (error) {
            dispatch(getBlackCardFailure(error));
        }
    }
};

// reset selected cards
export function resetSelectedCardsAction() {
    return {
        type: cardConstants.RESET_SELECTED_CARDS,
    }
}

export const resetSelectedCards = () => {
    return async dispatch => {
        dispatch(resetSelectedCardsAction());
    }
};

// remove selected cards
export function removeSelectedCardsAction(cardIds) {
    return {
        type: cardConstants.REMOVE_SELECTED_CARDS,
        cardIds,
    }
}

export function removeSelectedCards(cardIds) {
    return async dispatch => {
        dispatch(removeSelectedCardsAction(cardIds));
    }
}