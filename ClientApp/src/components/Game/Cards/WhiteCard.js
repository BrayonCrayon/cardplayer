import React, {useCallback, useMemo} from "react";
import {connect} from "react-redux";


const WhiteCard = ({ card, disabled, onSelect, selectedCardCount, blackCard, playerSelectedCards, isTurn}) => {
    const classes = useMemo(() => {
        return disabled ? "cursor-not-allowed shadow-inner" : "shadow-md hover:border-black cursor-pointer hover:shadow-lg";
    }, [disabled]);
    
    const selectClasses = useMemo(() => {
        return card.selected ? "border-blue-500" : "border-white";
    }, [card.selected]);
    
    const selectLimitClasses = useMemo(() => {
        return (selectedCardCount === blackCard.card.pick && !card.selected) ? "cursor-not-allowed shadow-inner border-none hover:shadow-none" : ""; 
    }, [selectedCardCount, blackCard.card.pick, card.selected]);
    
    const selectTest = useCallback(() => {
        if (!disabled && !playerSelectedCards && (selectedCardCount < blackCard.card.pick || card.selected))
        {
            onSelect(card);
        }
    }, [selectedCardCount, playerSelectedCards, blackCard.card.pick, disabled, card, onSelect]);
    
    return (
        <div className={`border-2 rounded bg-white m-1 h-48 p-2 w-1/5 ${classes} ${selectClasses}  ${selectLimitClasses} `}
            onClick={selectTest}
        >
            <div className="font-bold">
                <div dangerouslySetInnerHTML={{__html: card.card.text }} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    selectedCardCount: state.cardReducer.selectedCards,
    blackCard: state.cardReducer.blackCard,
    playerSelectedCards: state.cardReducer.playerSelectedCards,
    isTurn: state.gameReducer.isTurn,
});

export default connect(mapStateToProps)(WhiteCard);