import * as cardConstants from '../constants/cardConstants';
import Axios from "axios";

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
        
        if (!payload.userId && !payload.gameId && !payload.token)
            return;

        try {
            dispatch(getCardPending());
            const {data} = await Axios.get("/api/cards",  {
                params: {
                    userId: payload.userId,
                    gameId: payload.gameId,
                },
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            });
            dispatch(getCardSuccess(data));
        }
        catch (error) {
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

export function sendSelectedCardsSuccess(playerSelectedCards) {
    return {
        type: cardConstants.SEND_SELECTED_CARDS_SUCCESS,
        playerSelectedCards,
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
            },{
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                }
            });
            
            if (data) {
                dispatch(sendSelectedCardsSuccess(data));
                window.gameHub.playerSelectedCardsNotify(payload.game.name);
            } else {
                dispatch(sendSelectedCardsFailure(data));
            }
        } catch (error)
        {
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

export function checkAnyCardsSelectedSuccess(playerSelectedCards) {
    return {
        type: cardConstants.CHECK_ANY_CARDS_SELECTED_SUCCESS,
        playerSelectedCards,
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
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
                params: {
                    userId: payload.userId,
                    gameId: payload.gameId,
                }
            });
            dispatch(checkAnyCardsSelectedSuccess(data));
            if (data) {
                dispatch(getSelectedPlayerCards({
                    token: payload.token,
                    gameId: payload.gameId,
                }));
            }
        } catch (error)
        {
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

export function getSelectedPlayerCardsSuccess(selectedCards) {
    return {
        type: cardConstants.GET_SELECTED_PLAYER_CARDS_SUCCESS,
        selectedCards
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
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
                params: {
                    gameId: payload.gameId,
                }
            });
            console.log(data);
            dispatch(getSelectedPlayerCardsSuccess(data));
        } catch (error)
        {
            dispatch(getSelectedPlayerCardsFailure(error));
        }
    }
};