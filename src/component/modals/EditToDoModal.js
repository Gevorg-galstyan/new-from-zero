import React, {memo, useState, useRef, useEffect} from "react";
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";


function EditToDoModal(props) {
    const {toDo} = props
    const [values, setValues] = useState({
        _id: toDo._id,
        title: toDo.title,
        description: toDo.description,
        date: toDo.date !== '' ? toDo.date : new Date().toISOString()
    })

    const inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus()
    }, []);

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
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
                        onInput={(e) =>setValues({
                            ...values,
                            title: e.target.value
                        })}
                        ref={inputRef}
                        value={values.title}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>Create Date</label>
                    <DatePicker
                        minDate={new Date()}
                        selected={new Date(values.date)}
                        onChange={(e) => setValues({
                            ...values,
                            date: e.toISOString()
                        })}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>Description</label>
                    <FormControl
                        as={'textarea'}
                        onInput={(e) =>setValues({
                            ...values,
                            description: e.target.value
                        })}
                        value= { values.description }
                    />
                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"}
                        onClick={() => props.onHide('')}
                        >Close</Button>
                <Button variant={"primary"}
                        onClick={() => props.editToDo(values)}
                >Edit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default memo(EditToDoModal)

EditToDoModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    editToDo: PropTypes.func,
    toDo: PropTypes.object,
}