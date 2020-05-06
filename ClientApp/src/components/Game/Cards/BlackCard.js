import React from 'react';
import {connect} from "react-redux";

const BlackCard = ({blackCard, selectedCardCount, isTurn, playerSelectedCards}) => {
    
    const showBlackCard = () => {
        if (blackCard.card) {
            return (
                <div dangerouslySetInnerHTML={{__html: blackCard.card.text }} />
            )
        }
    };
    
    const displayCardSelectionLabel = () => {
        return (
            <div className="flex text-2xl self-center text-center text-black">
                Select 
                <div className="font-bold px-1">
                    {
                        blackCard.card && blackCard.card.pick - selectedCardCount
                    }
                </div>
                 Cards
            </div>
        ) 
    };
    
    const displayWinnerSelectionLabel = () => {
        return (
            <div className="flex text-2xl self-center text-center text-black">
                {
                    playerSelectedCards.length > 0 && 'Pick a Winner!' 
                }
                {
                    !(playerSelectedCards.length > 0) && 'Wait for Players to Select Their Cards.'
                }
            </div>
        )
    };

    return (
        <div className="flex flex-col w-full h-64 justify-center lg:w-1/2 ">
            {
                isTurn && displayWinnerSelectionLabel()
            }
            {
                !isTurn && displayCardSelectionLabel()
            }
            <div className="bg-black self-center text-white font-bold rounded overflow-y-auto h-56 w-3/4 p-2 md:w-1/2 lg:w-5/6">
                {
                    showBlackCard()
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    blackCard: state.cardReducer.blackCard,
    selectedCardCount: state.cardReducer.selectedCardCount,
    isTurn: state.gameReducer.isTurn,
    playerSelectedCards: state.cardReducer.playerSelectedCards,
});

export default connect(mapStateToProps)(BlackCard);