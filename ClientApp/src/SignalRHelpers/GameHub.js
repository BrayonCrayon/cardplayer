import store from '../store/configureStore';
import {addPlayer, checkUserTurn, removePlayer, resetGame, updatePlayers} from "../actions/gameActions";
import {deleteUsedCards, getBlackCard, getSelectedPlayerCards, resetSelectedCards} from "../actions/cardActions";
import Swal from "sweetalert2";

const signalR = require('@aspnet/signalr');

export class GameHub {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();
        
        this.connection.on("ReceiveMessage", this.receiveMessage);
        this.connection.on("PlayerJoined", this.playerJoined);
        this.connection.on("PlayerLeft", this.playerLeft);
        this.connection.on("UpdateActivePlayers", this.updateActivePlayers);
        this.connection.on("UpdatePlayerSelectedCards", this.updatePlayerSelectedCards);
        this.connection.on("ShowWinner", this.showWinner);
        this.connection.start();
    }
    
    // incoming requests
    receiveMessage = (user, message) => {
        console.log(user, message);
    };
    
    playerJoined = (playerName) => {
        store.dispatch(addPlayer(playerName));
        this.updatePlayers(store.getState().gameReducer.game.name);
    };
    
    playerLeft = (playerName) => {
        store.dispatch(removePlayer(playerName));
    };
    
    updateActivePlayers = (players) => {
        store.dispatch(updatePlayers(players));
    };

    updatePlayerSelectedCards = () => {
        const gameId = store.getState().gameReducer.game.id;
        const token = store.getState().authReducer.token;
        store.dispatch(getSelectedPlayerCards({
            gameId,
            token,
        }));
    };
    
    showWinner = (winnerName) => {
          Swal.fire(`The Winner is ${winnerName}`);
          const gameId = store.getState().gameReducer.game.id;
          const token = store.getState().authReducer.token;
          const user = store.getState().authReducer.user;
          const whiteCardIds = store.getState().cardReducer.whiteCards
              .filter(whiteCard => {
                  return whiteCard.selected;
              })
              .map(whiteCard => {
                  return whiteCard.card.id;
              });

        store.dispatch(deleteUsedCards({
            user,
            gameId,
            cardIds: whiteCardIds,
            token,
        }));
        
        store.dispatch(resetGame());
        store.dispatch(resetSelectedCards());

        store.dispatch(checkUserTurn({
            token,
            userId: user.sub,
            gameId,
        }));
        
        store.dispatch(getBlackCard({
            token,
            gameId,
        }));
    };

    // Outgoing requests
    joinGame = (gameName, userName) => {
        this.connection.invoke("JoinGame", gameName, userName)
            .then(() => {
                console.log("Game Joined");
            });  
    };
    
    leaveGame = (gameName, userName) => {
        this.connection.invoke("LeaveGame", gameName, userName)
            .then(() => {
                console.log("player left");
            });
    };
    
    updatePlayers = (gameName) => {
        this.connection.invoke("UpdateActivePlayers", gameName, store.getState().gameReducer.players)
            .then(() => {
                console.log("Players updated"); 
            });
    };
    
    playerSelectedCardsNotify = (gameName) => {
        this.connection.invoke("PlayerSelectedCardsNotify", gameName)
            .then(() => {
                console.log("Player Selected Cards Notification");
            })
    };
    
    tellPlayersTheWinner = (gameName, winnerName) => {
        this.connection.invoke("ShowWinner", gameName, winnerName)
            .then(() => {
                console.log("Winner shown");
            });
    }
}


