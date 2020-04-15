import React, {useCallback} from 'react';
import {selectGame} from "../../actions/gameActions";
import {useDispatch} from "react-redux";

export const GameItem = (props) => {
    const dispatch = useDispatch();
    const game = props.game;

    const continueGame = useCallback(() => {
        selectGame(game)(dispatch);
    }, [game]);
    
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