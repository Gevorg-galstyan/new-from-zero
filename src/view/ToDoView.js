import React, {PureComponent} from "react";
import {Col, Button, Row, Card} from "react-bootstrap";
import style from "../assets/css/style.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import DeleteModal from "../component/modals/DeleteModal";
import EditToDoModal from "../component/modals/EditToDoModal";

export default class ToDoView extends PureComponent {

    state = {
        id: '',
        deleteModalShow: false,
        editModalShow: false,
        toDo: ''
    }

    showDelModal = (id, approve = false) => {
        if (approve) {
            this.props.deleteToDo(id)
        }
        this.setState({
            id,
            deleteModalShow: !this.state.deleteModalShow,
        })
    }

    showEditModal = (id) => {

        const toDo = this.props.allState.toDo.filter((item)=>item.id === id)

        this.setState({
            editModalShow: !this.state.editModalShow,
            toDo
        })
    }

    changeVal = (val, type) => {
        const editedToDo = {
            id: this.state.toDo[0].id,
            title: type === 'title' ? val.trim() : this.state.toDo[0].title,
            description: type === 'description' ? val.trim() : this.state.toDo[0].description,
            date: type === 'date' ? new Date(val).toLocaleString() : this.state.toDo[0].date,
        }

        this.setState({
            toDo: [editedToDo]
        })
    }

    getAllData = () => {
        this.props.editToDo(this.state.toDo[0])
        this.showEditModal()
    };

    render() {
        const col = this.props.allState.toDo.map((e) => {
            return (
                <Col lg={3} md={4} key={e.id}>
                    <Card border="primary" className={this.props.allState.selectedTasks.has(e.id) ? style.selected : '' }>
                        <Card.Header>{e.title}</Card.Header>
                        <Card.Body>
                            <Card.Title className={style.toDoDate}>{e.date}</Card.Title>
                            <Card.Text>{e.description}</Card.Text>
                            <Card.Footer>
                                <div className={style.deleteButtonCont}>
                                    <Button
                                        variant={"primary"}
                                        className={'mr-2'}
                                        disabled={this.props.allState.selectedTasks.size}
                                        onClick={() => {
                                            this.showEditModal(e.id)
                                        }}
                                    >

                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                    <Button
                                        variant={"danger"}
                                        onClick={() => this.showDelModal(e.id)}
                                        disabled={this.props.allState.selectedTasks.size}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </div>
                            </Card.Footer>
                            <div className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    onChange={() => this.props.selectToDo(e.id)}
                                    checked={this.props.allState.selectedTasks.has(e.id)}
                                />
                            </div>
                        </Card.Body>
                    </Card>



                </Col>
            )
        })

        return (
            <Row className={"mt-3"}>
                {col}
                <DeleteModal
                    show={this.state.deleteModalShow}
                    onHide={this.showDelModal}
                    deleteToDo={this.props.deleteToDo}
                    dataId={this.state.id}
                />
                {

                    this.state.toDo.length > 0 &&
                    <EditToDoModal
                        show={this.state.editModalShow}
                        onHide={this.showEditModal}
                        changeVal={this.changeVal}
                        editToDo={this.getAllData}
                        toDo={this.state.toDo}
                    />
                }

            </Row>
        )
    }
}
