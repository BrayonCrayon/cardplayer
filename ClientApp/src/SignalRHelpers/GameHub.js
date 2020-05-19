import store from '../store/configureStore';
import {
    addPlayer,
    checkUserTurn,
    getActivePlayer,
    removePlayer,
    resetGame, setWinner, setWinnerCards,
    updatePlayers
} from "../actions/gameActions";
import {deleteUsedCards, getBlackCard, getSelectedPlayerCards, resetSelectedCards} from "../actions/cardActions";
import {LogLevel} from "@microsoft/signalr";
import {ApplicationPaths, BaseUrl} from "../components/api-authorization/ApiAuthorizationConstants";
import {showErrorMsg, showInfoMsg} from "../helpers/DialogPopup";

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
        
        this.connection.onreconnecting(() => {
            console.log("reconnecting");
        });
        this.connection.onreconnected(async () => {
            console.log("reconnected");
            if (Object.entries(store.getState().gameReducer.game).length) {
                console.log("rejoining game");
                await this.joinGame(store.getState().gameReducer.game.name, store.getState().authReducer.user.name);
            }
        });
        this.connection.onclose(() => {
            this.connection.start()
                .then()
                .catch((error) => {
                        if (error.message === "Unauthorized") {
                            showInfoMsg("You've been away a while, don't worry we are auto signing you in :)", 5000);
                            const url = BaseUrl + ApplicationPaths.Login;
                            window.location = url;
                        }
                    }
                );
        });
    }

    async connect() {
        new Promise((resolve, reject) => {
            if (this.connection.connectionId === null) {
                this.connection.start()
                    .then(() => {
                        return resolve();
                    })
                    .catch((error) => {
                        if (error.message === "Unauthorized") {
                            showInfoMsg("You've been away a while, don't worry we are auto signing you in :)", 5000);
                            const url = BaseUrl + ApplicationPaths.Login;
                            window.location = url;
                            // window.location.href = ApplicationPaths.Login;
                        }
                        return reject();
                    });
            }
        });
    }

    // In-coming Requests
    playerJoined = async (playerName) => {
        store.dispatch(addPlayer(playerName));
        await this.updatePlayers(store.getState().gameReducer.game.name);
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

    showWinner = async (winnerName, winnerCards) => {
        await store.dispatch(setWinner(winnerName));
        await store.dispatch(setWinnerCards(winnerCards));
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
        
        store.dispatch(getActivePlayer({
            gameId
        }));
    };

    // Outgoing requests
    joinGame = async (gameName, userName) => {
        console.log("Joining Game");
        await this.connect()
            .then(() => {
                this.connection.invoke("JoinGame", gameName, userName)
                    .then(() => {
                        console.log("Game Joined", gameName, userName);
                    })
                    .catch((error) => {
                        showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
                    });
            })
            .catch((error) => {
                showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
            });
    };

    leaveGame = async (gameName, userName) => {
        await this.connect()
            .then(() => {
                this.connection.invoke("LeaveGame", gameName, userName)
                    .then(() => {
                    })
                    .catch(() => {
                        showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
                    });
            })
            .catch((error) => {
                showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
            });
    };

    updatePlayers = async (gameName) => {
        await this.connect()
            .then(() => {
                this.connection.invoke("UpdateActivePlayers", gameName, store.getState().gameReducer.players)
                    .then(() => {
                    })
                    .catch((error) => {
                        showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
                    });
            })
            .catch((error) => {
                showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
            });
    };

    playerSelectedCardsNotify = async (gameName) => {
        await this.connect()
            .then(() => {
                this.connection.invoke("PlayerSelectedCardsNotify", gameName)
                    .then(() => {
                    })
                    .catch(() => {
                        showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
                    });
            })
            .catch((error) => {
                showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
            });
    };

    tellPlayersTheWinner = async (gameName, winnerName, winnerCards) => {
        await this.connect()
            .then(() => {
                this.connection.invoke("ShowWinner", gameName, winnerName, winnerCards)
                    .then(() => {
                    })
                    .catch(() => {
                        showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
                    });
            })
            .catch((error) => {
                showErrorMsg("Opps Something Went Wrong, Please Refresh Your Page.");
            });
    }
}


