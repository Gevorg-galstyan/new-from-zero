import React, {Component} from 'react';
import {Row, Container, Button} from "react-bootstrap";
import AddToDoModal from "../modals/addtoDoModal"
import styles from "../../assets/css/style.module.css"
import ToDoView from "../../view/ToDoView";
import { v4 as uuidv4 } from 'uuid';

export default class ToDo extends Component{
    state = {
        modalShow : false,
        toDo:[
            {id:'aaa', title: 1},
            {id:'bbb', title: 2},
            {id:'ccc', title: 3}
        ],
        selectedTasks : new Set(),
    }

    showModal = () => {
        this.setState({
            modalShow : !this.state.modalShow
        })
    }

    addToDo = (toDo) => {
        if(toDo.title === ''){
            alert('Please Fill  Todo Title');
            return;
        }
        if(toDo.date === ''){
            toDo.date = new Date().toDateString();
        }

        toDo["id"] = uuidv4();

        this.setState({
            toDo : [...this.state.toDo, toDo]
        }, ()=>{
            this.showModal()
        })
    }

    selectToDo = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks);

        selectedTasks.has(id) ? selectedTasks.delete(id) : selectedTasks.add(id)

        this.setState({
            selectedTasks
        })

    }

    render(){
        return(
            <Container>
                <Row className={"align-items-center justify-content-center mt-3"}>
                    <Button className={styles.circleButton} onClick={this.showModal}>+</Button>
                </Row>
                <ToDoView
                    allStateToDo = {this.state.toDo}
                    selectToDo = {this.selectToDo}
                />
                <AddToDoModal
                    show={this.state.modalShow}
                    onHide={this.showModal}
                    addToDo = {this.addToDo}
                />
            </Container>
        )
    }
}