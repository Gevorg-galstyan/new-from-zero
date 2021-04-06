import React, {PureComponent} from 'react';
import styles from "../../assets/css/style.module.css";
import AddToDoModal from "../modals/AddToDoModal";
import ToDoView from "../../view/ToDoView";
import DeleteModal from "../modals/DeleteModal";
import EditToDoModal from "../modals/EditToDoModal";
import Search from "../search/Search";
import {Row, Container, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import {onPageLoad, getUserInfo} from '../../store/actions';


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
            singleTask: id || null,
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

    selectToDo = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks);

        selectedTasks.has(id) ? selectedTasks.delete(id) : selectedTasks.add(id)

        this.setState({
            selectedTasks
        })
    }

    selectAll = () => {
        const allToDos = this.props.toDo.map((single) => single._id)

        this.setState({
            selectedTasks: this.props.toDo.length === this.state.selectedTasks.size ? new Set() : new Set(allToDos)
        })
    }

    componentDidMount() {
        this.props.onPageLoad();
        if(this.props.isAuth){
            this.props.getUserInfo();
        }

    }

    componentDidUpdate(prevProps) {

        if (!prevProps.addModalShow && this.props.addModalShow) {
            this.showModal()
        }
        if (!prevProps.delModalShow && this.props.delModalShow) {
            this.setState({
                selectedTasks: new Set(),
                deleteModalShow: false
            })
        }
        if (!prevProps.editModalShow && this.props.editModalShow) {
            this.setState({
                editModalShow: false
            })
        }
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

                <Row className={'my-2'}>
                    <Search />
                </Row>


                <Row className={"align-items-center justify-content-center my-5"}>
                    <Button
                        className={styles.circleButton}
                        onClick={this.showModal}
                        disabled={selectedTasks.size}
                    ><span>+</span></Button>
                </Row>

                <ToDoView
                    allState={this.state}
                    selectToDo={this.selectToDo}
                    showDeleteModal={this.showDelModal}
                    showEditModal={this.showEditModal}
                    toDo={this.props.toDo}
                />

                <Row className={"align-items-center  mt-5"}>
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


                {/*MODALS*/}
                {
                    this.state.modalShow &&
                    <AddToDoModal
                        show={this.state.modalShow}
                        onHide={this.showModal}
                    />
                }

                {
                    this.state.deleteModalShow &&
                    <DeleteModal
                        show={this.state.deleteModalShow}
                        onHide={this.showDelModal}
                        deleteId={this.state.singleTask}
                    />
                }

                {

                    this.state.editModalShow &&
                    <EditToDoModal
                        show={this.state.editModalShow}
                        onHide={this.showEditModal}
                        toDo={this.state.singleTask}
                    />
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toDo: state.toDo,
        addModalShow: state.addModalShow,
        delModalShow: state.delModalShow,
        editModalShow: state.editModalShow,
        isAuth: state.isAuth
    }
}

const mapDispatchToProps = {
    onPageLoad,
    getUserInfo
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
