import React, {memo} from "react";
import {Modal, Button} from "react-bootstrap";

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
                <Button variant={"danger"} onClick={() => props.onHide(props.dataId, false)}>Cancel</Button>
                <Button variant={"primary"} onClick={() => props.onHide(props.dataId, true)}>Yes</Button>
            </Modal.Body>
        </Modal>
    );
}

export default memo(DeleteModal);