import React, {useEffect} from 'react';
import GameMenu from "./GameMenu";
import PlayerCards from "./Cards/PlayerCards";
import BlackCard from "./Cards/BlackCard";
import {useDispatch, connect} from "react-redux";
import {setToken, setUser} from "../../actions/authActions";
import {GameList} from "./GameList";
import SelectedCards from "./Cards/SelectedCards";

const Game = ({gameSelected}) => {
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        setToken()(dispatch);
        setUser()(dispatch);
    }, [dispatch]);


    function showUserGames() {
        return <GameList/>
    }

    function playGame() {
        return (
            <div className="w-3/4 flex flex-col justify-center">
                <div className="w-full flex flex-wrap">
                    <BlackCard />
                    <SelectedCards/>
                </div>
                <PlayerCards/>
            </div>
        )
    }
    
    return (
      <div className="flex justify-center self-center bg-gray-200 rounded p-4 my-2 w-3/4 shadow-md">
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