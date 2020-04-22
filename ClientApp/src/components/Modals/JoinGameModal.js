import React, {useCallback, useState} from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";


export const JoinGameModal = ({buttonLabel, title, confirmBtnLabel, confirmCallback, inputLabel}) => {
    
    const [modal, setModal] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const toggle = useCallback(() => setModal(!modal), [modal, setModal]);
    
    const confirm = useCallback(() => {
        confirmCallback(inputVal);
        toggle();
    }, [confirmCallback, toggle, inputVal]);
    
    return (
      <div>
          <button className="primary" onClick={toggle}>{buttonLabel}</button>
          <Modal isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}>{title}</ModalHeader>
              <ModalBody>
                  <InputGroup>
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>{inputLabel}</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name={inputLabel} onChange={(e) => setInputVal(e.target.value) } />
                  </InputGroup>
              </ModalBody>
              <ModalFooter>
                  <button className="primary" onClick={confirm}>{confirmBtnLabel}</button>
                  <button className="rounded-full bg-red-500 text-white font-semibold py-2 px-4 hover:bg-red-700" onClick={toggle}>Cancel</button>
              </ModalFooter>
          </Modal>
      </div>  
    );
};