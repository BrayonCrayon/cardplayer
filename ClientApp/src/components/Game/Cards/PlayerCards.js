import React, {useCallback, useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {getCards, incrementSelectedCardCount, selectCards} from "../../../actions/cardActions";
import WhiteCard from "./WhiteCard";

const PlayerCards = (props) => {
    const dispatch = useDispatch();
    
    const onSelect = useCallback((card) => {
        selectCards(card.id)(dispatch);
        incrementSelectedCardCount(card.selected ? 1 : -1)(dispatch);
    }, []);
    
    useEffect(() => {
        getCards({
            gameId: props.game.id,
            userId: props.userId,
            token: props.token,
        })(dispatch);
    }, [props.game, props.userId, props.token]);
    
    return (
        <div className="flex flex-wrap w-full justify-around">
            {props.whiteCards.length && props.whiteCards.map(whiteCard => (
                <WhiteCard card={whiteCard} key={whiteCard.id} disabled={props.isTurn} selected={whiteCard.selected} onSelect={onSelect} />
            ))}
            {!props.whiteCards.length && 
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
});

export default connect(mapStateToProps)(PlayerCards);