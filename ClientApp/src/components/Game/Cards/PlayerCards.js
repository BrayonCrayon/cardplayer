import React, {useCallback, useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {getCards} from "../../../actions/cardActions";

const PlayerCards = (props) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        getCards({
            gameId: props.game.id,
            userId: props.userId,
            token: props.token,
        })(dispatch);
    }, [props.game, props.userId, props.token]);
    
    const showCards = () => {
        if (props.whiteCards.length > 0) {
            return props.whiteCards.map(whiteCard => (
                <div key={whiteCard.id} className="rounded shadow-md bg-white m-1 h-48 p-2 w-1/5">
                    <div className="font-bold">
                        <div dangerouslySetInnerHTML={{__html: whiteCard.card.text }} />
                    </div>
                </div>
            ))
        }
        
        return (
            <div className="text-lg text-center">
                No Cards Available
            </div>
        )
    };
    
    
    return (
        <div className="flex flex-wrap w-full justify-around">
            {
                showCards()
            }
        </div>
    );
};

const mapStateToProps = state => ({
    whiteCards: state.cardReducer.whiteCards,
    game: state.gameReducer.game,
    token: state.authReducer.token,
    userId: state.authReducer.user.sub,
});

export default connect(mapStateToProps)(PlayerCards);