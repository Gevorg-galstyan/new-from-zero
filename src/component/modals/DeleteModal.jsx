import React, {memo} from "react";
import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";

function DeleteModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure want to delete ToDo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant={"danger"} onClick={()=> {props.onHide()}}>Cancel</Button>
                <Button variant={"primary"} onClick={()=> {props.deleteToDo(props.deleteId)}}>Yes</Button>
            </Modal.Body>
        </Modal>
    );
}

export default memo(DeleteModal);



DeleteModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    deleteToDo: PropTypes.func,
}