import React from "react";
import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import {onDeleteToDo} from '../../store/actions'

function DeleteModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
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
                <Button variant={"primary"} onClick={()=>props.onDeleteToDo(props, props.isSingle)}>Yes</Button>
            </Modal.Body>
        </Modal>
    );
}


const mapStateToProps = (state)=>{
    return {
        toDo : state.toDo,
    }
}

const mapDispatchToProps = {
    onDeleteToDo
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);

DeleteModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    deleteId: PropTypes.node,
}