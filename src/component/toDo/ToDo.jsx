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
        toDo: [
            {
                id: 'aaa',
                title: 1,
                date: '20/22/2020',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            },
            {
                id: 'bbb',
                title: 2,
                date: '20/22/2020',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            },
            {
                id: 'ccc',
                title: 3,
                date: '20/22/2020',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }
        ],
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
        if (toDo.date === '') {
            toDo.date = new Date().toDateString();
        }

        toDo["id"] = uuidv4();

        this.setState({
            toDo: [...this.state.toDo, toDo]
        }, () => {
            this.showModal()
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
            if (item.id === toDo.id) {
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
            delItem = toDo.filter((e) => e.id !== id)

        this.setState({
            toDo: delItem,
        })
    }

    deleteMany = (toDos) => {
        const {toDo} = this.state;
        if (window.confirm(`Are you sure want to delete ToDo's # ${[...toDos].join(',')}`)) {
            const newToDo = toDo.filter((e) => !toDos.has(e.id));
            this.setState({
                toDo: newToDo,
                selectedTasks: new Set(),
            })
        }
    }

    selectAll = () => {
        const allToDos = this.state.toDo.map((single)=>single.id)

        this.setState({
            selectedTasks: this.state.toDo.length === this.state.selectedTasks.size ? new Set() : new Set(allToDos)
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