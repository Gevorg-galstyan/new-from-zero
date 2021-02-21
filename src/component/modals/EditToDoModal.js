import React, {PureComponent} from "react";
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";


export default class EditToDoModal extends PureComponent {

    inputVal = (event, type) => {
        const val = event.target.value;
        this.props.changeVal(val, type)
    }

    render() {
        const {toDo} = this.props

        return (
            <Modal
                {...this.props}
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
                            onInput={(e) => this.inputVal(e, 'title')}
                            value={toDo[0]?toDo[0].title:''}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <label className={'d-block w-100'}>Create Date</label>
                        <FormControl
                            type={'date'}
                            onInput={(e) => this.inputVal(e, 'date')}
                            value={toDo[0]?toDo[0].date:''}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <label className={'d-block w-100'}>Description</label>
                        <FormControl
                            as={'textarea'}
                            onInput={(e) => this.inputVal(e, 'description')}
                            value={toDo[0]?toDo[0].description:''}
                        />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"danger"} onClick={() => this.props.onHide('')}>Close</Button>
                    <Button variant={"primary"} onClick={() => this.props.editToDo()}>Edit</Button>
                </Modal.Footer>
            </Modal>
        );
    }


}