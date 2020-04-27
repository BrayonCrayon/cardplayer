import React, {useEffect, useMemo} from 'react';
import GameMenu from "./GameMenu";
import PlayerCards from "./Cards/PlayerCards";
import BlackCard from "./Cards/BlackCard";
import {useDispatch, connect} from "react-redux";
import {setToken, setUser} from "../../actions/authActions";
import {GameList} from "./GameList";
import SelectedCards from "./Cards/SelectedCards";
import {GameHub} from "../../SignalRHelpers/GameHub";

const Game = ({gameSelected, token}) => {
    const dispatch = useDispatch();
    
    useMemo(async () => {
        if (token.length > 0 && window.gameHub === undefined) {
            localStorage.setItem("token", token);
            window.gameHub = new GameHub();
            window.gameHub.connect();
        }
    }, [token]);
    
    useEffect(() => {
        setToken()(dispatch);
        setUser()(dispatch);
    }, [dispatch]);


    function showUserGames() {
        return <GameList/>
    }

    function playGame() {
        return (
            <div className="w-full flex flex-col justify-center lg:w-3/4">
                <div className="w-full flex flex-col lg:flex-wrap lg:flex-row">
                    <BlackCard />
                    <SelectedCards/>
                </div>
                <PlayerCards/>
            </div>
        )
    }
    
    return (
      <div className="flex flex-col-reverse justify-center self-center bg-gray-200 rounded p-4 my-2 w-3/4 shadow-md lg:flex-row">
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