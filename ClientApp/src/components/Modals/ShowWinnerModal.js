import React, {useCallback, useMemo, useState} from "react";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import {connect, useDispatch} from "react-redux";
import {setWinner, setWinnerCards} from "../../actions/gameActions";

const ShowWinnerModal = ({winner, winnerCards}) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    
    useMemo(() => {
        if (winner && winnerCards.length) {
            setModal(true);
        }
    }, [winner, winnerCards]);
    
    const toggle = useCallback(() => setModal(!modal), [modal, setModal]);
    const resetWinner = useCallback(() => {
        setWinner('')(dispatch);
        setWinnerCards([])(dispatch);
    }, []);

    return (
        <Modal isOpen={modal} toggle={toggle} onClosed={resetWinner}>
            <ModalHeader toggle={toggle}>{winner} Won!!</ModalHeader>
            <ModalBody className="bg-gray-100">
                <div className="flex flex-wrap justify-center">
                    {
                        winnerCards.map((card, idx) => (
                            <div key={idx} className="rounded bg-white m-1 overflow-y-auto h-48 p-2 w-1/3 shadow-md">
                                <div dangerouslySetInnerHTML={{__html: card }} />
                            </div>
                        ))
                    }
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="primary-cancel" onClick={() => {toggle(); resetWinner();}}>Ok</button>
            </ModalFooter>
        </Modal>
    );
};

const mapStateToProps = state => ({
    winner: state.gameReducer.winner,
    winnerCards: state.gameReducer.winnerCards,
});

export default connect(mapStateToProps)(ShowWinnerModal);