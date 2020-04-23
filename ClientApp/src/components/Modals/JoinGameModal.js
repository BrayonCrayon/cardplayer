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
      <div className="py-2 w-full self-center sm:w-1/3 lg:w-4/6">
          <button className="primary-secondary w-full" onClick={toggle}>{buttonLabel}</button>
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
                  <button className="primary-cancel" onClick={toggle}>Cancel</button>
              </ModalFooter>
          </Modal>
      </div>  
    );
};