import React, {memo, useState, useRef, useEffect} from "react";
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

function AddToDoModal(props) {
    const [values, setValues] = useState({
        title: '',
        description: '',
        date: new Date().toISOString()
    })

    const inputRef = useRef()

    useEffect(()=>{
        inputRef.current.focus()
    }, [])

    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add To Do
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>To Do Name</label>
                    <FormControl
                        aria-describedby="basic-addon1"
                        placeholder="To Do Name"
                        ref = {inputRef}
                        onInput={(e) => {
                            setValues({
                                ...values,
                                title: e.target.value
                            })
                        }}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>Create Date</label>

                    <DatePicker
                        minDate={new Date()}
                        selected={new Date(values.date)}
                        onChange={(e) => {
                            setValues({
                                ...values,
                                date: e.toISOString()
                            })
                        }}
                    />

                </InputGroup>

                <InputGroup className="mb-3">
                    <label className={'d-block w-100'}>Description</label>
                    <FormControl
                        aria-describedby="basic-addon1"
                        as={'textarea'}
                        placeholder="Description"
                        onInput={(e) => {
                            setValues({
                                ...values,
                                description: e.target.value
                            })
                        }}
                    />
                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"danger"}
                    onClick={props.onHide}
                >Close</Button>
                <Button
                    variant={"primary"}
                    onClick={() => {
                        props.addToDo(values)
                    }}
                >ADD TODO</Button>
            </Modal.Footer>
        </Modal>
    );


}

export default memo(AddToDoModal)

AddToDoModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    addToDo: PropTypes.func
}
