import React, {PureComponent} from "react";
import {Button, Card, Container, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import EditToDoModal from "../../modals/EditToDoModal";
import DeleteModal from "../../modals/DeleteModal";

class SingleTask extends PureComponent {

    state = {
        editModalShow: false,
        deleteModalShow: false,
        toDo: null
    }

    componentDidMount() {
        const id = this.props.match.params.taskId

        fetch(`http://localhost:3001/task/${id}`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    toDo: res,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    showEditModal = () => {
        this.setState({
            editModalShow: !this.state.editModalShow,
        })
    }

    showDelModal = () => {
        this.setState({
            deleteModalShow: !this.state.deleteModalShow
        })
    }

    editToDo = (val) => {
        console.log(val)
        if (val.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        fetch(`http://localhost:3001/task/${val._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: val.title,
                description: val.description,
                date: val.date.slice(0, 10)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    toDo: res,
                    editModalShow: false,
                })
            })
            .catch((error) => {
                console.log(error)
            })

    };

    deleteToDo = () => {
        fetch(`http://localhost:3001/task/${this.state.toDo._id}`, {
            method: 'DELETE'
        })
            .then((e) => e)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    this.props.history.push('/')
                } else {
                    throw new Error('Sorry something went wrong ')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const {toDo} = this.state
        return (

            <Container>
                <Row>
                    <Col xs={'12'}>
                        {
                            toDo ?
                                <Card border="primary" className={'text-center mt-5'}>
                                    <h3>{toDo.title}</h3>
                                    <Card.Body>
                                        <Card.Title>{toDo.date.split('T')[0]}</Card.Title>
                                        <Card.Text>{toDo.description}</Card.Text>
                                        <Card.Footer>
                                            <div>
                                                <Button
                                                    variant={"primary"}
                                                    className={'mr-2'}
                                                    onClick={this.showEditModal}
                                                >

                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Button>
                                                <Button
                                                    variant={"danger"}
                                                    onClick={this.showDelModal}
                                                >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </Button>
                                            </div>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                                :
                                <p></p>
                        }

                    </Col>
                </Row>


                {

                    this.state.editModalShow &&
                    <EditToDoModal
                        show={this.state.editModalShow}
                        onHide={this.showEditModal}
                        editToDo={this.editToDo}
                        toDo={this.state.toDo}
                    />
                }
                {
                    this.state.deleteModalShow &&
                    <DeleteModal
                        show={this.state.deleteModalShow}
                        onHide={this.showDelModal}
                        deleteToDo={this.deleteToDo}
                    />
                }

            </Container>
        )
    }


}

export default SingleTask