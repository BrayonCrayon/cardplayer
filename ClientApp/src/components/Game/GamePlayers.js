import React, { Component } from 'react';

export class GamePlayers extends Component {

    render() {
        return (
            <div className="shadow-md flex flex-col m-4 bg-white rounded">
                <div className="h-64 m-2">
                    <div className="text-black text-xl m-2">
                        Players
                    </div>
                    <div className="h-48 bg-gray-100 text-black text-sm shadow-inner flex justify-center rounded">
                        <div className="self-center ">
                            No Players in game
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    
}