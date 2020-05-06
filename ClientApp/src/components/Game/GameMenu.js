import React, {useCallback, useMemo} from 'react';
import GamePlayers from "./GamePlayers";
import {useDispatch, useSelector, connect} from 'react-redux';
import {
    addGame,
    joinGame,
    resetPlayers,
    selectGame
} from "../../actions/gameActions";
import { resetCards, sendSelectCards, setupNextRound} from "../../actions/cardActions";
import Swal from "sweetalert2";
import {JoinGameModal} from "../Modals/JoinGameModal";

const GameMenu = ({selectedCardCount, blackCard, game, whiteCards, hasPlayerSelectedCards, winner, isTurn, playerSelectedCards}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const token = useSelector(state => state.authReducer.token);

    const selectCardsBtnClasses = useMemo( () => {
        return Object.keys(blackCard).length > 0 && !hasPlayerSelectedCards && selectedCardCount === blackCard.card.pick ? "" : "cursor-not-allowed opacity-25";
    }, [selectedCardCount, blackCard, hasPlayerSelectedCards]);
    
    const pickWinnerBtnClasses = useMemo( () => {
        return playerSelectedCards.length > 0 ? '' : 'opacity-25 cursor-not-allowed'; 
    }, [playerSelectedCards]);
    
    const createGame = useCallback( () => {
        addGame(user, token)(dispatch);
    }, [user, token, dispatch]);
    
    const chooseWinner = useCallback(() => {
        if (playerSelectedCards.length === 0) return;
        
        if (!winner.length)
        {
            Swal.fire("You must select a winner first");
            return;
        }
        
        setupNextRound({
            token, 
            user,
            blackCardId: blackCard.card.id,
            game: game,
            winner,
        })(dispatch);
    }, [winner, token, user, blackCard, game, dispatch, playerSelectedCards]);
    
    const join = useCallback((name) => {
        joinGame({
            user: user,
            gameName: name,
            token,
        })(dispatch);

    }, [user, token, dispatch]);
    
    const leaveGame = useCallback(() => {
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#38a169',
            cancelButtonColor: '#4a5568',
            confirmButtonText: 'Yes, Leave Game!'
        }).then(async (result) => {
            if (result.value) {
                selectGame({game: {}})(dispatch);
                resetCards()(dispatch);
                await window.gameHub.leaveGame(game.name, user.name);
                resetPlayers()(dispatch);
            }
        })
    }, [game, user, dispatch]);
    
    const selectCards = useCallback(() => {
        if (Object.keys(blackCard).length > 0 && selectedCardCount === blackCard.card.pick && !hasPlayerSelectedCards)
        {
            sendSelectCards({
                game,
                userId: user.sub,
                token,
                cardIds: whiteCards.filter(wc => wc.selected).map(wc => wc.card.id),
            })(dispatch);
        }
    }, [selectedCardCount, blackCard, user, token, whiteCards, game, hasPlayerSelectedCards, dispatch]);
    
    const showPlayerControls = () => {
        return (

            <div className="flex flex-wrap pb-4 md:py-4 lg:flex-col">
                <div className="flex w-full justify-center md:pb-4 lg:self-center">
                    <div className="text-md self-center text-gray-800">
                        Game:
                    </div>
                    <div className="text-2xl font-semibold px-2 text-center" >
                        {
                            game.name
                        }
                    </div>
                </div>
                <div className="w-full flex flex-wrap justify-center md:w-1/2 lg:w-full lg:mx-4">
                    <button onClick={leaveGame} className="primary-cancel w-3/4 self-end lg:self-center lg:w-4/6" >Leave Game</button>
                    {
                        !isTurn &&
                        <button onClick={selectCards} className={`primary w-3/4 self-start lg:self-center my-2 lg:w-4/6 ${selectCardsBtnClasses}`}>Select Cards</button>
                    }
                    {
                        isTurn && 
                        <button onClick={chooseWinner} className={`primary w-3/4 self-start lg:self-center my-2 lg:w-4/6 ${pickWinnerBtnClasses}`}>Pick Winner</button>
                    }
                </div>
                <GamePlayers/>
            </div>
        );
    };
    
    const showGameControls = () => {
        return (
            <div className="flex flex-wrap p-1 w-full justify-around lg:flex-wrap lg:justify-center lg:py-4">
                <button onClick={createGame} className="primary w-full self-center sm:w-1/3 lg:w-4/6" >Create Game</button>
                <JoinGameModal buttonLabel="Join Game" title="Enter A Game Name" confirmBtnLabel="Join" inputLabel="Name" confirmCallback={join}/>
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
      <div className="w-full lg:w-1/4">
          {
              displayUi()
          }
      </div>
  );  
};

const mapStateToProps = state => ({
    game: state.gameReducer.game, 
    blackCard: state.cardReducer.blackCard,
    selectedCardCount: state.cardReducer.selectedCardCount,
    whiteCards: state.cardReducer.whiteCards,
    hasPlayerSelectedCards: state.cardReducer.hasPlayerSelectedCards,
    winner: state.gameReducer.winner,
    isTurn: state.gameReducer.isTurn,
    playerSelectedCards: state.cardReducer.playerSelectedCards,
});

export default connect(mapStateToProps)(GameMenu);