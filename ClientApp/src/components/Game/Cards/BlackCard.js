import React, { Component } from 'react';
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
        <div className="flex w-full h-64">
            <div className="bg-black text-white font-bold rounded h-48 w-1/5 p-2 ">
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