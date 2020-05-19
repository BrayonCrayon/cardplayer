import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {checkAnyCardsSelected, getCards, incrementSelectedCardCount, selectCards} from "../../../actions/cardActions";
import WhiteCard from "./WhiteCard";

const PlayerCards = ({whiteCards, game, userId, token, isTurn, hasPlayerSelectedCards, user, playerSelectedCards}) => {
    const dispatch = useDispatch();
    const [cardOrder, setCardOrder] = useState([]);

    useMemo(() => {
        const playerCards = [];
        playerSelectedCards
            .filter(card => card.user.userName === user.name)
            .forEach(card => {
                playerCards.push(card.cardId);
            });
        setCardOrder(playerCards);
    }, [setCardOrder, playerSelectedCards, user]);
    
    const getOrderNum = useCallback((cardId) => {
        return cardOrder.findIndex((id) => id === cardId) + 1;
    }, [cardOrder]);

    const onSelect = useCallback((card) => {
        selectCards(card.id)(dispatch);
        incrementSelectedCardCount(card.selected ? 1 : -1)(dispatch);
        let playerCards = cardOrder;
        if (card.selected) {
            playerCards.push(card.cardId);
        }
        else {
            playerCards = playerCards.filter(id => id !== card.cardId);
        }
        setCardOrder(playerCards);
    }, [dispatch, setCardOrder, cardOrder]);

    useEffect(() => {
        getCards({
            gameId: game.id,
            userId,
            token,
        })(dispatch);
        checkAnyCardsSelected({
            gameId: game.id,
            userId,
            token,
        })(dispatch);
    }, [game, userId, token, dispatch]);

    return (
        <div className="w-full mr-4 lg:w-1/4">
            <div className="text-xs font-semibold">
                Your Hand
            </div>
            <div className="w-full rounded border-2 border-black shadow-inner overflow-y-auto h-150 py-2">
                {whiteCards.length && whiteCards.map(whiteCard => (
                    <div className="flex flex-wrap justify-center" key={whiteCard.id}>
                        <WhiteCard card={whiteCard} disabled={isTurn || hasPlayerSelectedCards}
                                   onSelect={onSelect} cardOrder={getOrderNum(whiteCard.cardId)}/>
                    </div>
                ))}
                {!whiteCards.length &&
                <div className="text-lg text-center">
                    No Cards Available
                </div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    whiteCards: state.cardReducer.whiteCards,
    game: state.gameReducer.game,
    token: state.authReducer.token,
    userId: state.authReducer.user.sub,
    isTurn: state.gameReducer.isTurn,
    hasPlayerSelectedCards: state.cardReducer.hasPlayerSelectedCards,
    user: state.authReducer.user,
    playerSelectedCards: state.cardReducer.playerSelectedCards,
});

export default connect(mapStateToProps)(PlayerCards);