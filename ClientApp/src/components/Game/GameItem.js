﻿import React, {useCallback} from 'react';
import {selectGame} from "../../actions/gameActions";
import {connect, useDispatch} from "react-redux";

const GameItem = (props) => {
    const dispatch = useDispatch();
    const game = props.game;

    const continueGame = useCallback(() => {
        selectGame({
            game,
            userId: props.user.sub,
            token: props.token,
        })(dispatch);
    }, [game, props.user, props.token]);
    
    return (
        <div className="w-full flex flex-wrap justify-between py-2 border-dashed border-b-2 border-gray-500 ">
            <div className="flex justify-center text-lg w-1/4">
                <div className="font-semibold">
                    {game.name}
                </div>
            </div>
            <div className="w-1/4">
                <button className="primary" onClick={continueGame} >Continue</button>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
   user: state.authReducer.user,
   token: state.authReducer.token, 
});

export default connect(mapStateToProps)(GameItem);