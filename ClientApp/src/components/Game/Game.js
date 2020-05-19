import React, {useMemo} from 'react';
import GameMenu from "./GameMenu";
import PlayerCards from "./Cards/PlayerCards";
import BlackCard from "./Cards/BlackCard";
import {connect, useDispatch} from "react-redux";
import SelectedCards from "./Cards/SelectedCards";
import {startGameHub} from "../../actions/gameActions";

const Game = ({token, gameHub}) => {
    const dispatch = useDispatch();
    
    useMemo(async () => {
        if (token.length > 0 && !gameHub.isConnected()) {
            localStorage.setItem("token", token);
            startGameHub(gameHub)(dispatch);
        }
    }, [token]);
    
    return (
      <div className="flex flex-col-reverse justify-center self-center bg-gray-300 rounded p-4 my-2 w-11/12 shadow-md lg:flex-row">
          <div className="w-full flex flex-wrap-reverse justify-center lg:flex-no-wrap lg:w-3/4">
              <PlayerCards/>
              <div className="w-full flex flex-col justify-center lg:flex-wrap lg:w-2/3 lg:flex-row">
                  <BlackCard />
                  <SelectedCards/>
              </div>
          </div>
          <GameMenu />
      </div>  
    );
};

const mapStateToProps = state => ({
    user: state.authReducer.user,
    token: state.authReducer.token,
    gameHub: state.gameReducer.gameHub,
});

export default connect(mapStateToProps)(Game);