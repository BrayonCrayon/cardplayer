import React, {useMemo} from 'react';
import GameMenu from "./GameMenu";
import PlayerCards from "./Cards/PlayerCards";
import BlackCard from "./Cards/BlackCard";
import {connect} from "react-redux";
import {GameList} from "./GameList";
import SelectedCards from "./Cards/SelectedCards";
import {GameHub} from "../../SignalRHelpers/GameHub";

const Game = ({gameSelected, token}) => {
    
    useMemo(async () => {
        if (token.length > 0 && window.gameHub === undefined) {
            localStorage.setItem("token", token);
            window.gameHub = new GameHub();
            await window.gameHub.connect();
        }
    }, [token]);


    function showUserGames() {
        return <GameList/>
    }

    function playGame() {
        return (
            <div className="w-full flex flex-wrap-reverse justify-center lg:flex-no-wrap lg:w-3/4">
                <PlayerCards/>
                <div className="w-full flex flex-col justify-center lg:flex-wrap lg:w-2/3 lg:flex-row">
                    <BlackCard />
                    <SelectedCards/>
                </div>
            </div>
        )
    }
    
    return (
      <div className="flex flex-col-reverse justify-center self-center bg-gray-300 rounded p-4 my-2 w-11/12 shadow-md lg:flex-row">
          {
              Object.keys( gameSelected).length > 0
              ? playGame()
              : showUserGames()
          }
          <GameMenu />
      </div>  
    );
};

const mapStateToProps = state => ({
    gameSelected: state.gameReducer.game,
    user: state.authReducer.user,
    token: state.authReducer.token,
});

export default connect(mapStateToProps)(Game);