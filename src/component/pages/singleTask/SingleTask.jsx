import React, {PureComponent} from "react";
import {Button, Card, Container, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import EditToDoModal from "../../modals/EditToDoModal";
import DeleteModal from "../../modals/DeleteModal";

class SingleTask extends PureComponent {

    state = {
        task: null,
        editModalShow: false,
        deleteModalShow: false,
        toDo:null
    }

    componentDidMount() {
        const id = this.props.match.params.taskId

        fetch(`http://localhost:3001/task/${id}`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    task: res,
                    toDo: res,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    showEditModal = () => {
        this.setState({
            editModalShow: !this.state.editModalShow
        })
    }

    showDelModal = (id,bool) => {

        if(bool){
            fetch(`http://localhost:3001/task/${this.state.task._id}`, {
                method: 'DELETE'
            })
                .then((e) => e)
                .then((res) => {
                    if (res.status < 200 && res.status >= 300) {
                        throw new Error('Something Went Wrong')
                    }
                    this.props.history.push('/')
                })
                .catch((err) => {
                    console.log(err)
                })

        }else{
            this.setState({
                deleteModalShow: !this.state.deleteModalShow
            })
        }

    }

    changeVal = (val, type) => {

        const editedToDo = {
            _id: this.state.task._id,
            title: type === 'title' ? val.trim() : this.state.toDo.title,
            description: type === 'description' ? val.trim() : this.state.toDo.description,
            date: type === 'date' ? val : this.state.toDo.date
        }
        this.setState({
            toDo: editedToDo
        })
    }

    getAllData = () => {
        const {toDo} = this.state;
        if (toDo.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        fetch(`http://localhost:3001/task/${toDo._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: toDo.title,
                description: toDo.description,
                date: toDo.date.slice(0, 10)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    task: res,
                    editModalShow: false,
                })
            })
            .catch((error) => {
                console.log(error)
            })

    };


    render() {
        const {task} = this.state

        return (

            <Container>
                <Row>
                    <Col xs={'12'}>
                        {
                            task ?
                                <Card border="primary" className={'text-center mt-5'}>
                                    <h3>{task.title}</h3>
                                    <Card.Body>
                                        <Card.Title>{task.date.split('T')[0]}</Card.Title>
                                        <Card.Text>{task.description}</Card.Text>
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
                        changeVal={this.changeVal}
                        editToDo={this.getAllData}
                        toDo={[this.state.toDo]}
                    />
                }
                {
                    task &&
                    <DeleteModal
                        show={this.state.deleteModalShow}
                        onHide={this.showDelModal}
                        dataId={this.state.task._id}
                    />
                }

            </Container>
        )
    }


}

export default SingleTask