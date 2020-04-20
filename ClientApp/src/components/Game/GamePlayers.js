import React from 'react';
import {connect, useDispatch} from "react-redux";

const GamePlayers = ({players}) => {

    return (
        <div className="shadow-md flex flex-col m-4 bg-white rounded">
            <div className="h-64 m-2">
                <div className="text-black text-xl m-2">
                    Players
                </div>
                <div className="text-black text-sm shadow-inner flex flex-wrap rounded">
                    {
                        players.length && players.map(name => {
                           return <div key={name} className="w-full border-b-2 border-gray-300 px-2">
                               {name}
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
});


export default connect(mapStateToProps)(GamePlayers);