import React, {PureComponent} from 'react';
import {Row, Container, Button} from "react-bootstrap";
import AddToDoModal from "../modals/AddToDoModal";
import styles from "../../assets/css/style.module.css";
import ToDoView from "../../view/ToDoView";
import PageLoadAlert from "../alerts/PageLoadAlert";
import DeleteModal from "../modals/DeleteModal";
import EditToDoModal from "../modals/EditToDoModal";


export default class ToDo extends PureComponent {
    state = {
        singleTask: null,
        modalShow: false,
        deleteModalShow: false,
        editModalShow: false,
        displayAlert: false,
        selectedTasks: new Set(),
        toDo: []
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
        const singleTask = {...this.state.toDo.find((e) => e._id == id)}
        console.log(singleTask)
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
        toDo.date = toDo.date.slice(0, 10)
        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(toDo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    toDo: [...this.state.toDo, res]
                }, () => {
                    this.showModal()
                })
            })
            .catch((error) => {
                console.log(error)
            })


    }

    editToDo = (toDo) => {
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
                if (res && typeof res === "object" && res.title ) {
                    const {toDo} = this.state;
                    let changedToDo = toDo.findIndex((e) => e._id === res._id);
                    toDo[changedToDo] = res;

                    this.setState({
                        toDo,
                        editModalShow: false
                    })
                } else {
                    throw new Error('Sorry something went wrong ')
                }

            })
            .catch((error) => {
                console.log(error)
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
        if(typeof id === "string"){
            fetch(`http://localhost:3001/task/${id}`, {
                method: 'DELETE'
            })
                .then((e) => e)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        const {toDo} = this.state,
                            delItem = toDo.filter((e) => e._id !== id)
                        this.setState({
                            toDo: delItem,
                            deleteModalShow: false
                        })
                    } else {
                        throw new Error('Sorry something went wrong ')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }else{
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
                            deleteModalShow:false
                        })
                    }else{
                        throw new Error('Sorry something went wrong ')
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    selectAll = () => {
        const allToDos = this.state.toDo.map((single) => single._id)

        this.setState({
            selectedTasks: this.state.toDo.length === this.state.selectedTasks.size ? new Set() : new Set(allToDos)
        })
    }

    componentDidMount() {
        fetch('http://localhost:3001/task')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    toDo: res
                })
            })
            .catch((error) => {
                if (error) {
                    this.setState({
                        displayAlert: true
                    })
                }
            })
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
                        {this.state.toDo.length !== this.state.selectedTasks.size ? "Select All" : "Unselect"}
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
