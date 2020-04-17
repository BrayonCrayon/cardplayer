import React, {useCallback, useEffect} from 'react';
import { GamePlayers } from "./GamePlayers";
import {useDispatch, useSelector, connect} from 'react-redux';
import {addGame, checkUserTurn, selectGame} from "../../actions/gameActions";
import {resetCards} from "../../actions/cardActions";

const GameMenu = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const token = useSelector(state => state.authReducer.token);
    const dispatch = useDispatch();


    
    const createGame = useCallback( () => {
        addGame(user.sub, token)(dispatch);
    }, [user, token, props.game]);
    
    const leaveGame = useCallback(() => {
        selectGame({game: {}})(dispatch);
        resetCards()(dispatch);
    }, []);
    
    const showPlayerControls = () => {
        return (

            <div className="flex flex-col justify-around py-2">
                <div className="flex pb-4 justify-center">
                    <div className="text-md self-center text-gray-800">
                        Game:
                    </div>
                    <div className="text-2xl font-semibold px-2" >
                        {
                            props.game.name
                        }
                    </div>
                </div>
                <button onClick={leaveGame} className="primary" >Leave Game</button>
                <GamePlayers/>
            </div>
        );
    };
    
    const showGameControls = () => {
        return (
            <div className="flex justify-around py-2">
                <button onClick={createGame} className="primary" >Create Game</button>
                <button className="primary" >Join Game</button>
            </div>
        );
    };
    
    const displayUi = () => {
        if (Object.keys(props.game).length > 0) {
            return showPlayerControls();
        } else {
            return showGameControls();
        }
    };
    
  return (
      <div className="w-1/4">
          {
              displayUi()
          }
      </div>
  );  
};

const mapStateToProps = state => ({
   game: state.gameReducer.game, 
});

export default connect(mapStateToProps)(GameMenu);