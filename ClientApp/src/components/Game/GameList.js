import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGames, selectGame} from "../../actions/gameActions";
import {GameItem} from "./GameItem";

export const GameList = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authReducer.user.sub);
    const token = useSelector(state => state.authReducer.token);
    const games = useSelector(state => state.gameReducer.games);

    useEffect(() => {
        if (userId && token) {
            fetchGames(userId, token)(dispatch);
        }
    }, [userId, token]);
    
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
        <div className="w-3/4 flex flex-col justify-center ">
            <div className="text-4xl font-bold pl-4 py-2">
                Games
            </div>
            <div className="w-full bg-white rounded-tl rounded-r">
                <div className="w-1/4 text-lg text-center">
                    Name
                </div>
            </div>
            <div className="h-88 overflow-auto shadow-inner bg-white rounded py-2 px-2">
                {
                    displayGameList()
                }
            </div>
        </div>
    );
    
};