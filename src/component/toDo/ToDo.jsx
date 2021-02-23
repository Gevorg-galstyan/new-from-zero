import React, {PureComponent} from 'react';
import {Row, Container, Button} from "react-bootstrap";
import AddToDoModal from "../modals/AddToDoModal";
import styles from "../../assets/css/style.module.css";
import ToDoView from "../../view/ToDoView";
import PageLoadAlert from "../alerts/PageLoadAlert";
import PropTypes from 'prop-types';


export default class ToDo extends PureComponent {
    state = {
        modalShow: false,
        toDo: [],
        selectedTasks: new Set(),
        displayAlert: false
    }


    showModal = () => {
        this.setState({
            modalShow: !this.state.modalShow,
        })
    }

    addToDo = (toDo) => {
        if (toDo.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        console.log(toDo)
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
                let {toDo} = this.state

                const editedToDo = toDo.map((item) => {
                    if (item._id === res._id) {
                        item = res
                    }
                    return item
                })

                this.setState({
                    toDo: editedToDo
                })
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

    deleteToDo = (id) => {
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
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    deleteMany = (toDos) => {
        const {toDo} = this.state;
        if (window.confirm(`Are you sure want to delete ToDo's # ${[...toDos].join(',')}`)) {


            const body = {
                tasks: [...toDos]
            }
            console.log(body)
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
                    if(result){
                        const newToDo = toDo.filter((e) => !toDos.has(e._id));
                        this.setState({
                            toDo: newToDo,
                            selectedTasks: new Set(),
                        })
                    }

                })
                .catch((err)=>{
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
                        onClick={() => this.deleteMany(selectedTasks)}
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
                    deleteToDo={this.deleteToDo}
                    editToDo={this.editToDo}
                />

                <AddToDoModal
                    show={this.state.modalShow}
                    onHide={this.showModal}
                    addToDo={this.addToDo}
                />


            </Container>
        )
    }
}
ToDo.propTypes = {
    allState: PropTypes.object,
    selectToDo: PropTypes.func,
    deleteToDo: PropTypes.func,
    editToDo: PropTypes.func,
    addToDo: PropTypes.func,
}