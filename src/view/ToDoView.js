import React, {PureComponent} from "react";
import {Col, Button, Row, Card} from "react-bootstrap";
import style from "../assets/css/style.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import DeleteModal from "../component/modals/DeleteModal";
import EditToDoModal from "../component/modals/EditToDoModal";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default class ToDoView extends PureComponent {

    state = {
        _id: '',
        deleteModalShow: false,
        editModalShow: false,
        toDo: ''
    }

    showDelModal = (id, approve = false) => {
        if (approve) {
            this.props.deleteToDo(id)
        }
        this.setState({
            _id: id,
            deleteModalShow: !this.state.deleteModalShow,
        })
    }

    showEditModal = (id) => {
        const toDo = this.props.allState.toDo.filter((item)=>item._id === id)
        this.setState({
            editModalShow: !this.state.editModalShow,
            toDo
        })
    }

    changeVal = (val, type) => {
        const editedToDo = {
            _id: this.state.toDo[0]._id,
            title: type === 'title' ? val.trim() : this.state.toDo[0].title,
            description: type === 'description' ? val.trim() : this.state.toDo[0].description,
            date: type === 'date' ? val : this.state.toDo[0].date
        }
        this.setState({
            toDo: [editedToDo]
        })
    }

    getAllData = () => {
        this.props.editToDo(this.state.toDo[0])
        this.setState({
            editModalShow: false,
        })
    };

    render() {
        const col = this.props.allState.toDo.map((e) => {
            return (
                <Col lg={3} md={4} key={e._id} className={'mt-3'}>
                    <Card border="primary" className={this.props.allState.selectedTasks.has(e._id) ? style.selected : '' }>
                        <Link to={`/task/${e._id}`}> <Card.Header>{e.title}</Card.Header> </Link>
                        <Card.Body>

                                <Card.Title className={style.toDoDate}>{e.date.split('T')[0]}</Card.Title>

                            <Card.Text>{e.description}</Card.Text>
                            <Card.Footer>
                                <div className={style.deleteButtonCont}>
                                    <Button
                                        variant={"primary"}
                                        className={'mr-2'}
                                        disabled={this.props.allState.selectedTasks.size}
                                        onClick={() => {
                                            this.showEditModal(e._id)
                                        }}
                                    >

                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                    <Button
                                        variant={"danger"}
                                        onClick={() => this.showDelModal(e._id)}
                                        disabled={this.props.allState.selectedTasks.size}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </div>
                            </Card.Footer>
                            <div className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    onChange={() => this.props.selectToDo(e._id)}
                                    checked={this.props.allState.selectedTasks.has(e._id)}
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
                    dataId={this.state._id}
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
ToDoView.propTypes = {
    onHide: PropTypes.object,
    show: PropTypes.bool,
    deleteToDo: PropTypes.func,
    dataId: PropTypes.string,
    changeVal: PropTypes.func,
    editToDo: PropTypes.func,
    toDo: PropTypes.array,
}
