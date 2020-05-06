import React, {useCallback} from 'react';
import {selectGame} from "../../actions/gameActions";
import {connect, useDispatch} from "react-redux";

const GameItem = (props) => {
    const dispatch = useDispatch();
    const game = props.game;

    const continueGame = useCallback(async () => {
        await selectGame({
            game,
            user: props.user,
            token: props.token,
        })(dispatch);
    }, [game, props.user, props.token, dispatch]);
    
    return (
        <div className="w-full flex flex-wrap justify-between py-2 border-dashed border-b-2 border-gray-500 md:justify-around">
            <div className="flex justify-center text-md w-1/2 lg:text-lg">
                <div className="font-semibold self-center">
                    {game.name}
                </div>
            </div>
            <div className="w-1/2 md:w-1/4 flex justify-end sm:justify-center">
                <button className="secondary text-sm md:text-md" onClick={continueGame} >Continue</button>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
   user: state.authReducer.user,
   token: state.authReducer.token, 
});

export default connect(mapStateToProps)(GameItem);