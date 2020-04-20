import store from '../store/configureStore';
import {addPlayer, removePlayer, updatePlayers} from "../actions/gameActions";
import {getSelectedPlayerCards} from "../actions/cardActions";

const signalR = require('@aspnet/signalr');

export class GameHub {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();
        
        this.connection.on("ReceiveMessage", this.receiveMessage);
        this.connection.on("PlayerJoined", this.playerJoined);
        this.connection.on("PlayerLeft", this.playerLeft);
        this.connection.on("UpdateActivePlayers", this.updateActivePlayers);
        this.connection.on("UpdatePlayerSelectedCards", this.updatePlayerSelectedCards);
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
}


