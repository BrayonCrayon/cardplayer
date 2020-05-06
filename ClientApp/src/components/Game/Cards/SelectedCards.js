import React, {useCallback, useMemo, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {FormGroup, Input, Label} from "reactstrap";
import {setWinner} from "../../../actions/gameActions";


const SelectedCards = ({playerSelectedCards, isTurn}) => {
    const dispatch = useDispatch();
    const [pickedCards, setPickedCards] = useState(new Map());
    
    const pickWinner = useCallback((userName) => {
        setWinner(userName)(dispatch);
    }, [dispatch]);
    
    useMemo(() => {
        const playerCardsMap = new Map();
        playerSelectedCards.forEach((item) => {
            const cards = playerCardsMap.get(item.user.userName);
            if (cards !== undefined) {
                if (cards.find(value => value.id === item.id) === undefined) {
                    cards.push(item);
                }
            }
            else {
                playerCardsMap.set(item.user.userName, [item]);
            }

        });
        setPickedCards(playerCardsMap);
    }, [playerSelectedCards, setPickedCards]);
    


    return (
      <div className="w-full bg-white rounded p-2 my-4 lg:m-0">
          <div className="text-xs font-semibold">
              Selected Cards
          </div>
          <FormGroup className="border-2 border-black rounded flex flex-wrap justify-center shadow-inner overflow-auto h-80 bg-gray-100">
                  {
                      [...pickedCards.keys()].map((userName) => (
                          <FormGroup key={userName} check className="w-5/6 flex self-center border-b-2 border-gray-600 py-2">
                              {
                                  isTurn && 
                                  <div className="self-center">
                                      <Label check>
                                          <Input type="radio" name="userId" onChange={() => pickWinner(userName)}/>
                                          Select
                                      </Label>
                                  </div>
                              }
                              <div className="w-full flex flex-wrap justify-center">
                                  {
                                      pickedCards.get(userName).map(whiteCard => (
                                          <div key={whiteCard.id} className="border border-black shadow-md rounded overflow-y-auto bg-white m-1 h-40 p-2 w-3/4 md:w-1/3" dangerouslySetInnerHTML={{__html: whiteCard.card.text }} />
                                      ))
                                  }
                              </div>
                          </FormGroup>
                      ))
                  }
          </FormGroup>
      </div>  
    );
};

const mapStateToProps = state => ({
    playerSelectedCards: state.cardReducer.playerSelectedCards, 
    isTurn: state.gameReducer.isTurn,
});

export default connect(mapStateToProps)(SelectedCards);