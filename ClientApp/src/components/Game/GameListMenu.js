import React, {useCallback} from 'react';
import {useDispatch, useSelector, connect} from 'react-redux';
import {
    addGame,
    joinGame,
} from "../../actions/gameActions";
import {JoinGameModal} from "../Modals/JoinGameModal";
import {useHistory} from "react-router-dom";

const GameListMenu = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.authReducer.user);
    const token = useSelector(state => state.authReducer.token);

    const createGame = useCallback(() => {
        addGame(user, token)(dispatch);
        history.push('/game');
    }, [user, token, dispatch]);

    const join = useCallback((name) => {
        joinGame({
            user: user,
            gameName: name,
            token,
        })(dispatch);
        history.push('/game');
    }, [user, token, dispatch]);

    return (
        <div className="w-full lg:w-1/4">
            <div className="flex flex-wrap p-1 w-full justify-around lg:flex-wrap lg:justify-center lg:py-4">
                <button onClick={createGame} className="primary w-full self-center sm:w-1/3 lg:w-4/6" >Create Game</button>
                <JoinGameModal buttonLabel="Join Game" title="Enter A Game Name" confirmBtnLabel="Join"
                               inputLabel="Name" confirmCallback={join}/>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(GameListMenu);
