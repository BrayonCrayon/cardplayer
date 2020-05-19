import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchGames, startGameHub} from "../../actions/gameActions";
import GameItem from "./GameItem";
import GameListMenu from "./GameListMenu";

const GameList = ({gameHub}) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authReducer.user.sub);
    const token = useSelector(state => state.authReducer.token);
    const games = useSelector(state => state.gameReducer.games);

    useEffect(() => {
        if (userId && token) {
            fetchGames(userId, token)(dispatch);
        }
    }, [userId, token, dispatch]);
    
    useEffect(() => {
        if (token.length > 0 && !gameHub.isConnected()) {
            localStorage.setItem("token", token);
            startGameHub(gameHub)(dispatch);
        }
    }, [token]);
    
    const displayGameList = () => {
        
        if (games.length > 0) {
            return games.map(game => (
                    <GameItem game={game} key={game.id}/>
                ));
        }
        
      return (
        <div className="text-lg text-center">
            No Games Available
        </div>  
      );
    };

    return (
        <div className="flex flex-col-reverse justify-center self-center bg-gray-300 rounded p-4 my-2 w-11/12 shadow-md lg:flex-row">
            <div className="w-full flex flex-col justify-center rounded bg-white lg:w-3/4">
                <div className="text-4xl font-bold pl-4 py-2">
                    Games
                </div>
                <div className="w-full bg-white rounded-tl rounded-r">
                    <div className="w-1/2 text-lg text-center ">
                        Name
                    </div>
                </div>
                <div className="h-96 overflow-auto shadow-inner bg-white rounded py-2 md:h-150 px-2">
                    {
                        displayGameList()
                    }
                </div>
            </div>
            <GameListMenu />
        </div>
    );
    
};


const mapStateToProps = state => ({
    gameHub: state.gameReducer.gameHub,
});

export default connect(mapStateToProps)(GameList);