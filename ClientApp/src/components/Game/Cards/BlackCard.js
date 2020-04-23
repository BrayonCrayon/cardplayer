import React from 'react';
import {connect} from "react-redux";

const BlackCard = (props) => {
    
    const showBlackCard = () => {
        if (props.blackCard.card) {
            return (
                <div dangerouslySetInnerHTML={{__html: props.blackCard.card.text }} />
            )
        }
    };

    return (
        <div className="flex w-full h-56 justify-center lg:w-1/4 ">
            <div className="bg-black text-white font-bold rounded h-56 w-3/4 p-2 md:w-1/2 lg:w-5/6">
                {
                    showBlackCard()
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    blackCard: state.cardReducer.blackCard,
});

export default connect(mapStateToProps)(BlackCard);