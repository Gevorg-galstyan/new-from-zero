import React, {useEffect, useState} from "react";
import {Col, Button, Row, Form} from "react-bootstrap";
import style from "../assets/css/style.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faHourglassStart, faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import {textEllipsis} from '../helpers/utils'
import {Link} from "react-router-dom";
import {onEditStatus} from "../store/actions";
import {connect} from "react-redux";

function ToDoView(props) {

    const [status, setStatus] = useState({
        _id: '',
        status: ''
    })

    const onEditToDoStatus = (id, changedStatus) => {
        setStatus({
            _id: id,
            status: changedStatus === 'active' ? 'done' : 'active'
        })
    }

    useEffect(()=>{
        if(status.status !== '') props.onEditStatus(status)
    },[status])

    const col = props.toDo.map((e) => {
        return (
            <Col xs={12} key={e._id} className={'mb-4'}>
                <div
                        className={`${props.allState.selectedTasks.has(e._id) ? style.selected : ''} row align-items-center`}>
                    <div className={style.checkbox}>
                        <input
                            type="checkbox"
                            onChange={() => props.selectToDo(e._id)}
                            checked={props.allState.selectedTasks.has(e._id)}
                        />
                    </div>
                    <div className={'d-flex ml-auto align-items-center'}>
                        <Link to={`/task/${e._id}`} className={style.toDoName}> {textEllipsis(e.title, 20)}</Link>
                        <p className={`${style.toDoDesc} m-0`}>{textEllipsis(e.description, 60)}</p>
                        <div className={'d-flex align-items-center'}>
                            <span
                                className={`${e.status === 'active' ? style.toDoActive : style.toDoDone} ${style.toDoStatus}`}
                            ></span>
                            <span className={style.toDoStatusText}>{e.status}</span>
                        </div>
                    </div>


                    <div className={style.deleteButtonCont}>
                        <span className={style.toDoDate}><FontAwesomeIcon icon={faHourglassStart}
                                                                          className={'mr-2'}/> {e.date.slice(0, 10)}</span>
                        <span className={style.toDoDate}><FontAwesomeIcon icon={faCalendarDay}
                                                                          className={'mr-2'}/> {e.created_at.slice(0, 10)}</span>

                        <Form.Check
                            type="switch"
                            className={style.switchStatus}
                            id={e._id}
                            defaultChecked={e.status === 'active' ? false : true}
                            onChange={(event) => onEditToDoStatus(e._id, e.status)}
                        />

                        <Button
                            variant={"primary"}
                            className={`${style.rowBtn} mr-2`}
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
                            className={style.rowBtn}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </div>
                </div>
            </Col>
        )
    })

    return (
        <Row className={`${style.h60}`}>
            {col}
        </Row>
    )
}


const mapDispatchToProps = {
    onEditStatus
}
const mapStateToProps = (state) => {
    return {
        toDo: state.toDo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoView)

ToDoView.propTypes = {
    allState: PropTypes.object,
    selectToDo: PropTypes.func,
    showDeleteModal: PropTypes.func,
    showEditModal: PropTypes.func,
}
