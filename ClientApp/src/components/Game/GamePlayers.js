import React from 'react';
import {connect} from "react-redux";

const GamePlayers = ({players, activePlayer}) => {
    
    return (
        <div className="shadow-md flex flex-col w-full bg-white rounded md:w-1/2 lg:m-4 lg:w-full">
            <div className="h-72 m-2">
                <div className="text-black text-xl m-2">
                    Players
                </div>
                <div className="bg-gray-100 text-black text-sm shadow-inner flex flex-col rounded overflow-auto h-56 px-2">
                    {
                        players.length && players.map(name => {
                           return <div key={name} className="w-full border-b border-black p-2 flex justify-between">
                               <div>
                                    {name}
                               </div>
                               {
                                   activePlayer === name && 
                                       <div className="w-5 bg-black rounded text-white text-center font-semibold">AP</div>
                               }
                            </div>
                        })
                    }
                    {
                        !players.length && <div className="self-center ">
                                No Players in game
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    players: state.gameReducer.players, 
    activePlayer: state.gameReducer.activePlayer,
});


export default connect(mapStateToProps)(GamePlayers);