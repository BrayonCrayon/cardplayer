import React, {useCallback, useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {checkAnyCardsSelected, getCards, incrementSelectedCardCount, selectCards} from "../../../actions/cardActions";
import WhiteCard from "./WhiteCard";

const PlayerCards = ({whiteCards, game, userId, token, isTurn, hasPlayerSelectedCards}) => {
    const dispatch = useDispatch();
    
    const onSelect = useCallback((card) => {
        selectCards(card.id)(dispatch);
        incrementSelectedCardCount(card.selected ? 1 : -1)(dispatch);
    }, [dispatch]);
    
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
        <div className="flex flex-wrap w-full justify-around">
            {whiteCards.length && whiteCards.map(whiteCard => (
                <WhiteCard card={whiteCard} key={whiteCard.id} disabled={isTurn || hasPlayerSelectedCards} selected={whiteCard.selected} onSelect={onSelect} />
            ))}
            {!whiteCards.length && 
                <div className="text-lg text-center">
                    No Cards Available
                </div>
            }
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
});

export default connect(mapStateToProps)(PlayerCards);