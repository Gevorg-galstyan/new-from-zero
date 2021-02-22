import React, {PureComponent} from 'react';
import {Row, Container, Button} from "react-bootstrap";
import AddToDoModal from "../modals/AddToDoModal";
import styles from "../../assets/css/style.module.css";
import ToDoView from "../../view/ToDoView";
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

export default class ToDo extends PureComponent {
    state = {
        modalShow: false,
        toDo: [],
        selectedTasks: new Set(),
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
        // if (toDo.date === '') {
        //     toDo.date = new Date().toDateString();
        // }
        // console.log(toDo)


        fetch('http://localhost:3001/task',{
            method : 'POST',
            body : JSON.stringify(toDo),
            headers: {
                'Content-Type':'application/json'
            }
        })
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res)

                this.setState({
                    toDo: [...this.state.toDo, res]
                }, () => {
                    this.showModal()
                })
            })


    }

    editToDo = (toDo) => {
        if (toDo.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        if (toDo.date === '') {
            toDo.date = new Date().toDateString();
        }

        const editedToDo = this.state.toDo.map((item) => {
            if (item._id === toDo._id) {
                item = toDo
            }
            return item
        })

        this.setState({
            toDo: editedToDo
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
        const {toDo} = this.state,
            delItem = toDo.filter((e) => e._id !== id)

        this.setState({
            toDo: delItem,
        })
    }

    deleteMany = (toDos) => {
        const {toDo} = this.state;
        if (window.confirm(`Are you sure want to delete ToDo's # ${[...toDos].join(',')}`)) {
            const newToDo = toDo.filter((e) => !toDos.has(e._id));
            this.setState({
                toDo: newToDo,
                selectedTasks: new Set(),
            })
        }
    }

    selectAll = () => {
        const allToDos = this.state.toDo.map((single)=>single._id)

        this.setState({
            selectedTasks: this.state.toDo.length === this.state.selectedTasks.size ? new Set() : new Set(allToDos)
        })
    }

    componentDidMount() {
        fetch('http://localhost:3001/task')
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res)
                this.setState({
                    toDo: res
                })
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
                        {this.state.toDo.length !== this.state.selectedTasks.size ? "Select All" : "Unselect" }
                    </Button>
                </Row>

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