import React, {PureComponent} from 'react';
import {Row, Container, Button} from "react-bootstrap";
import AddToDoModal from "../modals/AddToDoModal";
import styles from "../../assets/css/style.module.css";
import ToDoView from "../../view/ToDoView";
import PageLoadAlert from "../alerts/PageLoadAlert";
import DeleteModal from "../modals/DeleteModal";
import EditToDoModal from "../modals/EditToDoModal";
import {connect} from 'react-redux'
import request from "../../helpers/request";

class ToDo extends PureComponent {
    state = {
        singleTask: null,
        modalShow: false,
        deleteModalShow: false,
        editModalShow: false,
        displayAlert: false,
        selectedTasks: new Set(),
    }


    showModal = () => {
        this.setState({
            modalShow: !this.state.modalShow,
        })
    }

    showDelModal = (id) => {
        this.setState({
            singleTask: id,
            deleteModalShow: !this.state.deleteModalShow,
        })
    }

    showEditModal = (id) => {
        const singleTask = {...this.props.toDo.find((e) => e._id == id)}
        this.setState({
            singleTask,
            editModalShow: !this.state.editModalShow,
        })
    }

    addToDo = (toDo) => {
        if (toDo.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        this.props.onAddToDo(toDo)
        this.setState({
            modalShow: false,
        })
    }

    editToDo = (toDo) => {
        if (toDo.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        this.props.onEditToDo(toDo, this.props.toDo)

        this.setState({
            editModalShow: false
        })
    }

    selectToDo = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks);

        selectedTasks.has(id) ? selectedTasks.delete(id) : selectedTasks.add(id)

        this.setState({
            selectedTasks
        })
    }

    deleteToDo = () => {
        const id = this.state.singleTask;
        this.props.onDeleteToDo(id, this.props)

        this.setState({
            deleteModalShow: false
        })
    }

    selectAll = () => {
        const allToDos = this.props.toDo.map((single) => single._id)

        this.setState({
            selectedTasks: this.props.toDo.length === this.state.selectedTasks.size ? new Set() : new Set(allToDos)
        })
    }

    componentDidMount() {
        this.props.onPageLoad()
    }

    closeAlert = () => {
        this.setState({
            displayAlert: false
        })
    }

    render() {
        const {selectedTasks} = this.state

        return (
            <Container>
                <Row className={"align-items-center justify-content-center mt-3"}>
                    <Button
                        className={styles.circleButton}
                        onClick={this.showModal}
                        disabled={selectedTasks.size}
                    >+</Button>
                </Row>
                <Row className={"align-items-center  mt-3"}>
                    <Button
                        variant={'danger'}
                        disabled={!selectedTasks.size}
                        onClick={() => this.showDelModal(selectedTasks)}
                    >Delete Selected</Button>

                    <Button
                        variant={'warning'}
                        onClick={this.selectAll}
                        className={'ml-3'}
                    >
                        {this.props.toDo.length !== this.state.selectedTasks.size ? "Select All" : "Unselect"}
                    </Button>
                </Row>

                {
                    this.state.displayAlert &&
                    <PageLoadAlert
                        closeAlert={this.closeAlert}
                    />
                }

                <ToDoView
                    allState={this.state}
                    selectToDo={this.selectToDo}
                    showDeleteModal={this.showDelModal}
                    showEditModal={this.showEditModal}
                    toDo={this.props.toDo}
                />

                {/*MODALS*/}
                {
                    this.state.modalShow &&
                    <AddToDoModal
                        show={this.state.modalShow}
                        onHide={this.showModal}
                        addToDo={this.addToDo}
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

                {

                    this.state.editModalShow &&
                    <EditToDoModal
                        show={this.state.editModalShow}
                        onHide={this.showEditModal}
                        editToDo={this.editToDo}
                        toDo={this.state.singleTask}
                    />
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toDo: state.toDo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPageLoad: () => {
            request('http://localhost:3001/task')
                .then((res) => {
                    dispatch({type: "ON_PAGE_LOAD", toDo: res})
                })
        },
        onAddToDo: (toDo) => {
            toDo.date = toDo.date.slice(0, 10)
            request('http://localhost:3001/task', "POST", toDo)
                .then((res) => {
                    dispatch({type: 'ADD_TODO', toDo: res})
                })
        },
        onEditToDo: (toDo, state) => {
            let body = {
                title: toDo.title,
                description: toDo.description,
                date: toDo.date.slice(0, 10)
            };
            request(`http://localhost:3001/task/${toDo._id}`, "PUT", body)
                .then((toDo) => {
                    dispatch({type: 'EDIT_TODO', toDo})
                })
        },
        onDeleteToDo: (id, props) => {
            if (typeof id === "string") {
                request(`http://localhost:3001/task/${id}`, 'DELETE')
                    .then(() => {
                        const {toDo} = props,
                            delItem = toDo.filter((e) => e._id !== id)

                        dispatch({type: "DELETE_TODO", toDo: delItem})
                    })

            } else {
                const {toDo} = this.state;
                const body = {
                    tasks: [...id]
                }
                fetch('http://localhost:3001/task', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then((res) => res)
                    .then(async (res) => {
                        const result = await res.json();
                        if (res.status >= 200 && res.status < 300) {
                            const newToDo = toDo.filter((e) => !id.has(e._id));
                            this.setState({
                                toDo: newToDo,
                                selectedTasks: new Set(),
                                deleteModalShow: false
                            })
                        } else {
                            throw new Error('Sorry something went wrong ')
                        }

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)