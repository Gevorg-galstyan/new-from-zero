import React, {PureComponent} from "react";
import {Button, Card, Container, Row, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import EditToDoModal from "../../modals/EditToDoModal";
import DeleteModal from "../../modals/DeleteModal";
import {connect} from 'react-redux';
import {loadSingleToDo, onEditStatus} from '../../../store/actions'

class SingleTask extends PureComponent {

    state = {
        editModalShow: false,
        deleteModalShow: false,
        toDo: this.props.toDo,
    }

    componentDidMount() {
        const id = this.props.match.params.taskId
        this.props.loadSingleToDo(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.delFromSingle && this.props.delFromSingle) {
            this.props.history.push('/')
        }
        if (!prevProps.editModalShow && this.props.editModalShow) {
            this.setState({
                editModalShow: false
            })
        }
    }

    showEditModal = () => {
        this.setState({
            editModalShow: !this.state.editModalShow,
        })
    }

    showDelModal = () => {
        this.setState({
            deleteModalShow: !this.state.deleteModalShow
        })
    }

    onEditToDoStatus = (id, changedStatus) => {
        this.setState({
            toDo: {
                ...this.state.toDo,
                _id: id,
                status: changedStatus === 'active' ? 'done' : 'active'
            }
        }, () => {
            const {toDo} = this.state;
            const isSingle = true;

            this.props.onEditStatus(toDo, isSingle)
        });
    }

    render() {
        const {toDo} = this.props;
        return (
            <Container>
                <Row>
                    <Col xs={'12'}>
                        {
                            toDo ?
                                <Card border="primary" className={'text-center mt-5'}>
                                    <h3>{toDo.title}</h3>
                                    <Card.Body>
                                        <div className={'d-flex align-items-center justify-content-around'}>
                                            <Card.Title>
                                                <h6>Date</h6>
                                                {toDo.date.split('T')[0]}
                                            </Card.Title>
                                            <Card.Title>
                                                <h6>Created</h6>
                                                {toDo.created_at.split('T')[0]}
                                            </Card.Title>
                                        </div>

                                        <Card.Text>{toDo.description}</Card.Text>
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
                                                <Form.Check
                                                    type="switch"
                                                    // className={style.switchStatus}
                                                    id={toDo._id}
                                                    defaultChecked={toDo.status === 'active' ? false : true}
                                                    onChange={(event) => this.onEditToDoStatus(toDo._id, toDo.status)}
                                                />
                                            </div>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                                :
                                <p>There are no Task</p>
                        }

                    </Col>
                </Row>


                {

                    this.state.editModalShow &&
                    <EditToDoModal
                        show={this.state.editModalShow}
                        onHide={this.showEditModal}
                        toDo={this.props.toDo}
                        isSingle
                    />
                }
                {
                    this.state.deleteModalShow &&
                    <DeleteModal
                        show={this.state.deleteModalShow}
                        onHide={this.showDelModal}
                        deleteId={this.props.match.params.taskId}
                        isSingle
                    />
                }

            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        delFromSingle: state.delFromSingle,
        editModalShow: state.editModalShow,
        toDo: state.singleToDo,
    }
}

const mapDispatchToProps = {
    loadSingleToDo,
    onEditStatus
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)