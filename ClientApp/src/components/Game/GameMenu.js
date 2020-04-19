import React, {useCallback, useEffect, useMemo} from 'react';
import { GamePlayers } from "./GamePlayers";
import {useDispatch, useSelector, connect} from 'react-redux';
import {addGame, checkUserTurn, selectGame} from "../../actions/gameActions";
import {resetCards} from "../../actions/cardActions";
import Swal from "sweetalert2";

const GameMenu = ({selectedCardCount, blackCard, game}) => {
    const user = useSelector(state => state.authReducer.user);
    const token = useSelector(state => state.authReducer.token);
    const dispatch = useDispatch();


    const selectCardsBtnClasses = useMemo( () => {
        return Object.keys(blackCard).length > 0 && selectedCardCount === blackCard.card.pick ? "" : "cursor-not-allowed";
    }, [selectedCardCount, blackCard]);
    
    const createGame = useCallback( () => {
        addGame(user.sub, token)(dispatch);
    }, [user, token, game]);
    
    const joinGame = useCallback(() => {
        
    }, [user, token]);
    
    const leaveGame = useCallback(() => {
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#38a169',
            cancelButtonColor: '#4a5568',
            confirmButtonText: 'Yes, Leave Game!'
        }).then((result) => {
            if (result.value) {
                selectGame({game: {}})(dispatch);
                resetCards()(dispatch);
            }
        })
    }, []);
    
    const selectCards = useCallback(() => {
        if (Object.keys(blackCard).length > 0 && selectedCardCount === blackCard.card.pick)
        {
            // TODO: call api to select whitecards
            console.log("here");
        }
    }, [selectedCardCount, blackCard]);
    
    const showPlayerControls = () => {
        return (

            <div className="flex flex-col justify-around py-2">
                <div className="flex pb-4 justify-center">
                    <div className="text-md self-center text-gray-800">
                        Game:
                    </div>
                    <div className="text-2xl font-semibold px-2" >
                        {
                            game.name
                        }
                    </div>
                </div>
                <button onClick={leaveGame} className="primary" >Leave Game</button>
                <button onClick={selectCards} className={`primary my-2 ${selectCardsBtnClasses}`}>Select Cards</button>
                <GamePlayers/>
            </div>
        );
    };
    
    const showGameControls = () => {
        return (
            <div className="flex justify-around py-2">
                <button onClick={createGame} className="primary" >Create Game</button>
                <button onClick={joinGame} className="primary" >Join Game</button>
            </div>
        );
    };
    
    const displayUi = () => {
        if (Object.keys(game).length > 0) {
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
    blackCard: state.cardReducer.blackCard,
    selectedCardCount: state.cardReducer.selectedCards,
});

export default connect(mapStateToProps)(GameMenu);