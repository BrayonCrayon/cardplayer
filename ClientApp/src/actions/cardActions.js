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


