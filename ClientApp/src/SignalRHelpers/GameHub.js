import store from '../store/configureStore';
import {addPlayer, checkUserTurn, removePlayer, resetGame, updatePlayers} from "../actions/gameActions";
import {deleteUsedCards, getBlackCard, getSelectedPlayerCards, resetSelectedCards} from "../actions/cardActions";
import Swal from "sweetalert2";
import {LogLevel} from "@microsoft/signalr";

const signalR = require('@microsoft/signalr');

export class GameHub {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .configureLogging(LogLevel.Critical)
            .withAutomaticReconnect()
            .withUrl("/gameHub", {
                accessTokenFactory: () => localStorage.getItem("token"),
            }).build();
        
        this.connection.on("PlayerJoined", this.playerJoined);
        this.connection.on("PlayerLeft", this.playerLeft);
        this.connection.on("UpdateActivePlayers", this.updateActivePlayers);
        this.connection.on("UpdatePlayerSelectedCards", this.updatePlayerSelectedCards);
        this.connection.on("ShowWinner", this.showWinner);
        this.connection.onclose(() => {
            this.connection.start().then().catch();
        });
    }
    
    connect() {
        if (this.connection.connectionId === null) {
            this.connection.start()
                .then(() => {})
                .catch();
        }
    }
    
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
        store.dispatch(getSelectedPlayerCards({
            gameId,
        }));
    };
    
    showWinner = (winnerName) => {
          Swal.fire(`The Winner is ${winnerName}`);
          const gameId = store.getState().gameReducer.game.id;
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
        }));
        
        store.dispatch(resetGame());
        store.dispatch(resetSelectedCards());

        store.dispatch(checkUserTurn({
            userId: user.sub,
            gameId,
        }));
        
        store.dispatch(getBlackCard({
            gameId,
        }));
    };

    // Outgoing requests
    joinGame = (gameName, userName) => {
        this.connection.invoke("JoinGame", gameName, userName)
            .then(() => {
            })
            .catch();  
    };
    
    leaveGame = (gameName, userName) => {
        this.connection.invoke("LeaveGame", gameName, userName)
            .then(() => {
            })
            .catch();
    };
    
    updatePlayers = (gameName) => {
        this.connection.invoke("UpdateActivePlayers", gameName, store.getState().gameReducer.players)
            .then(() => {
            })
            .catch();
    };
    
    playerSelectedCardsNotify = (gameName) => {
        this.connection.invoke("PlayerSelectedCardsNotify", gameName)
            .then(() => {
            })
            .catch();
    };
    
    tellPlayersTheWinner = (gameName, winnerName) => {
        this.connection.invoke("ShowWinner", gameName, winnerName)
            .then(() => {
            })
            .catch();
    }
}


