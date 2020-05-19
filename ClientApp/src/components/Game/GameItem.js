import React, {useCallback} from 'react';
import {selectGame} from "../../actions/gameActions";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const GameItem = ({game, gameHub, user, token}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const continueGame = useCallback(async () => {
        if (gameHub._hub.state !== "Connected") return;
        
        await selectGame({
            game,
            user: user,
            token: token,
        })(dispatch);
        history.push('/game');
    }, [game, user, token, dispatch, gameHub._hub.state]);

    return (
        <div
            className="w-full flex flex-wrap justify-between py-2 border-dashed border-b-2 border-gray-500 md:justify-around">
            <div className="flex justify-center text-md w-1/2 lg:text-lg">
                <div className="font-semibold self-center">
                    {game.name}
                </div>
            </div>
            <div className="w-1/2 md:w-1/4 flex justify-end sm:justify-center">
                <button className="secondary text-sm md:text-md" onClick={continueGame}
                >
                    Continue
                </button>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    user: state.authReducer.user,
    token: state.authReducer.token,
    gameHub: state.gameReducer.gameHub,
});

export default connect(mapStateToProps)(GameItem);