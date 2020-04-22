import React from 'react';
import {connect} from "react-redux";

const GamePlayers = ({players}) => {

    return (
        <div className="shadow-md flex flex-col m-4 bg-white rounded">
            <div className="h-72 m-2">
                <div className="text-black text-xl m-2">
                    Players
                </div>
                <div className="bg-gray-100 text-black text-sm shadow-inner flex flex-col rounded overflow-auto h-56 px-2">
                    {
                        players.length && players.map(name => {
                           return <div key={name} className="w-full border-b border-black p-2">
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