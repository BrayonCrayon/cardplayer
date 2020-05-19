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
import {ApplicationPaths} from "../components/api-authorization/ApiAuthorizationConstants";
import {showErrorMsg, showInfoMsg} from "../helpers/DialogPopup";

const signalR = require('@microsoft/signalr');

export class GameHub {
    _hub = {};
    
    constructor() {
        this._hub = new signalR.HubConnectionBuilder()
            .configureLogging(LogLevel.Critical)
            .withAutomaticReconnect()
            .withUrl("/gameHub", {
                accessTokenFactory: () => localStorage.getItem("token"),
            }).build();

        this._hub.on("PlayerJoined", this.playerJoined);
        this._hub.on("PlayerLeft", this.playerLeft);
        this._hub.on("UpdateActivePlayers", this.updateActivePlayers);
        this._hub.on("UpdatePlayerSelectedCards", this.updatePlayerSelectedCards);
        this._hub.on("ShowWinner", this.showWinner);
        
        this._hub.onreconnecting(() => {
        });
        this._hub.onreconnected(async () => {
            if (Object.entries(store.getState().gameReducer.game).length) {
                await this.joinGame(store.getState().gameReducer.game.name, store.getState().authReducer.user.name);
            }
        });
        this._hub.onclose(() => {
            this._hub.start()
                .then(() => {
                })
                .catch((error) => {
                        if (error.message === "Unauthorized") {
                            showInfoMsg("You've been away a while, don't worry we are auto signing you in :)", 5000);
                            window.location.pathname = ApplicationPaths.Login;
                        }
                    }
                );
        });
    }

    async connect() {
        this._hub.start()
            .then(() => {
            })
            .catch((error) => {
                if (error.message === "Unauthorized") {
                    showInfoMsg("You've been away a while, don't worry we are auto signing you in :)", 5000);
                    window.location.pathname = ApplicationPaths.Login;
                }
            });
    }

    async connectCheck() {
        new Promise((resolve, reject) => {
            if (!this.isConnected()) {
                this._hub.start()
                    .then(() => {
                        return resolve();
                    })
                    .catch((error) => {
                        if (error.message === "Unauthorized") {
                            showInfoMsg("You've been away a while, don't worry we are auto signing you in :)", 5000);
                            window.location.pathname = ApplicationPaths.Login;
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
        await this.connectCheck()
            .then(() => {
                this._hub.invoke("JoinGame", gameName, userName)
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

    leaveGame = async (gameName, userName) => {
        await this.connectCheck()
            .then(() => {
                this._hub.invoke("LeaveGame", gameName, userName)
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
        await this.connectCheck()
            .then(() => {
                this._hub.invoke("UpdateActivePlayers", gameName, store.getState().gameReducer.players)
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
        await this.connectCheck()
            .then(() => {
                this._hub.invoke("PlayerSelectedCardsNotify", gameName)
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
        await this.connectCheck()
            .then(() => {
                this._hub.invoke("ShowWinner", gameName, winnerName, winnerCards)
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
    
    static get instance() { return gameHub }
    
    isConnected() {
        return GameHub.instance._hub.state === "Connected";
    };
}

const gameHub = new GameHub();
export default gameHub;


