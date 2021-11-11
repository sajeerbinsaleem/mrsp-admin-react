import React from "react";
import {
  Modal as BSModal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";

const Modal = (props) => {
  return (
    <div>
      <BSModal
        centered
        fullscreen
        size="lg"
        isOpen={props.show}
        toggle={props.modalHandler}
      >
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button onClick={props.modalHandler}>Close</Button>
          {props.submitHandler && (
            <Button color="warning" onClick={props.submitHandler}>
              Submit
            </Button>
          )}
        </ModalFooter>
      </BSModal>
    </div>
  );
};

export default Modal;
