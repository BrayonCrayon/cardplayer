import React, {useCallback, useMemo} from "react";
import {connect} from "react-redux";


const WhiteCard = ({ card, disabled, onSelect, selectedCardCount, blackCard, hasPlayerSelectedCards}) => {
    const classes = useMemo(() => {
        return disabled ? "cursor-not-allowed shadow-inner" : "shadow-md hover:border-black cursor-pointer hover:shadow-lg";
    }, [disabled]);
    
    const selectClasses = useMemo(() => {
        return card.selected ? "border-blue-500" : "border-white";
    }, [card.selected]);
    
    const selectLimitClasses = useMemo(() => {
        return (selectedCardCount === blackCard.card.pick && !card.selected) ? "cursor-not-allowed border-none hover:shadow-none opacity-50" : ""; 
    }, [selectedCardCount, blackCard.card.pick, card.selected]);
    
    const selectTest = useCallback(() => {
        if (!disabled && !hasPlayerSelectedCards && (selectedCardCount < blackCard.card.pick || card.selected))
        {
            onSelect(card);
        }
    }, [selectedCardCount, hasPlayerSelectedCards, blackCard.card.pick, disabled, card, onSelect]);
    
    return (
        <div className={`border-2 rounded bg-white m-1 overflow-y-auto h-48 p-2 w-3/4 ${classes} ${selectClasses}  ${selectLimitClasses} `}
            onClick={selectTest}
        >
            <div className="font-bold">
                <div dangerouslySetInnerHTML={{__html: card.card.text }} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    selectedCardCount: state.cardReducer.selectedCardCount,
    blackCard: state.cardReducer.blackCard,
    hasPlayerSelectedCards: state.cardReducer.hasPlayerSelectedCards,
    isTurn: state.gameReducer.isTurn,
});

export default connect(mapStateToProps)(WhiteCard);