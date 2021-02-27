import React, {memo} from "react";
import {Col, Button, Row, Card} from "react-bootstrap";
import style from "../assets/css/style.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import {textEllipsis} from '../helpers/utils'
import {Link} from "react-router-dom";

function ToDoView (props)  {
        const col = props.toDo.map((e) => {
            return (
                <Col lg={3} md={4} key={e._id} className={'mt-3'}>
                    <Card border="primary"
                          className={`${props.allState.selectedTasks.has(e._id) ? style.selected : ''} ${style.cardHeight}`}>
                        <Link to={`/task/${e._id}`}> <Card.Header>{textEllipsis(e.title, 20)}</Card.Header> </Link>
                        <Card.Body className={'d-flex align-items-end flex-wrap'}>
                            <Card.Title className={style.toDoDate}>{e.date.slice(0,10)}</Card.Title>
                            <Card.Text className={'w-100 align-self-center'}>{textEllipsis(e.description, 60)}</Card.Text>
                            <Card.Footer className={'w-100 bg-transparent'}>
                                <div className={style.deleteButtonCont}>
                                    <Button
                                        variant={"primary"}
                                        className={'mr-2'}
                                        disabled={props.allState.selectedTasks.size}
                                        onClick={() => {
                                            props.showEditModal(e._id)
                                        }}
                                    >

                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                    <Button
                                        variant={"danger"}
                                        onClick={() => props.showDeleteModal(e._id)}
                                        disabled={props.allState.selectedTasks.size}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </div>
                            </Card.Footer>
                            <div className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    onChange={() => props.selectToDo(e._id)}
                                    checked={props.allState.selectedTasks.has(e._id)}
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
            </Row>
        )
}
export default memo(ToDoView)
ToDoView.propTypes = {
    allState: PropTypes.object,
    selectToDo: PropTypes.func,
    showDeleteModal: PropTypes.func,
    showEditModal: PropTypes.func,
}
