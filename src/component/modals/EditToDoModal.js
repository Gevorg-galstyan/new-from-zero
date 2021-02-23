import React, {memo} from "react";
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import DatePicker from "react-datepicker";


function EditToDoModal(props) {

    const {toDo} = props

    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit To Do
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>To Do Name</label>
                    <FormControl
                        onInput={(e) => props.changeVal(e.target.value, 'title')}
                        value={toDo[0] ? toDo[0].title : ''}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>Create Date</label>
                    <DatePicker
                        selected={new Date(toDo[0].date)}
                        onChange={(e) => props.changeVal(e.toISOString(), 'date')}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>Description</label>
                    <FormControl
                        as={'textarea'}
                        onInput={(e) => props.changeVal(e.target.value, 'description')}
                        value={toDo[0] ? toDo[0].description : ''}
                    />
                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} onClick={() => props.onHide('')}>Close</Button>
                <Button variant={"primary"} onClick={() => props.editToDo()}>Edit</Button>
            </Modal.Footer>
        </Modal>
    );

}
export default memo(EditToDoModal)