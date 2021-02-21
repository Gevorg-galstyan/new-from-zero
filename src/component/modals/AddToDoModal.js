import React, {PureComponent} from "react";
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";


export default class AddToDoModal extends PureComponent {
    // dentium

    state = {
        title: '',
        description: '',
        date: ''
    }

    inputVal = (event, type) => {
        const val = event.target.value;

        this.setState({
            title: type === 'title' ? val.trim() : this.state.title,
            description: type === 'description' ? val.trim() : this.state.description,
            date: type === 'date' ? new Date(val).toLocaleString() : this.state.date,
        })
    }

    getAllData = () => {
        this.props.addToDo({...this.state})
    };

    render() {
        return (
            <Modal
                {...this.props}
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
                            onInput={(e) => this.inputVal(e, 'title')}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <label className={'d-block w-100'}>Create Date</label>
                        <FormControl
                            aria-describedby="basic-addon1"
                            type={'date'}
                            onInput={(e) => this.inputVal(e, 'date')}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <label className={'d-block w-100'}>Description</label>
                        <FormControl
                            aria-describedby="basic-addon1"
                            as={'textarea'}
                            placeholder="Description"
                            onInput={(e) => this.inputVal(e, 'description')}
                        />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"danger"} onClick={this.props.onHide}>Close</Button>
                    <Button variant={"primary"} onClick={() => this.getAllData()}>ADD TODO</Button>
                </Modal.Footer>
            </Modal>
        );
    }


}