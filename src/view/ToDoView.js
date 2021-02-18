import React from "react";
import {Col, Button, Row} from "react-bootstrap";
import style from "../assets/css/style.module.css";

export default function ToDoView(props) {


    return (
        <Row className={"mt-3"}>
            {
                props.allStateToDo.map((e) => {
                    return (
                        <Col lg={3} md={4} key={e.id}>
                            <div className={style.singleToDo}>
                                <div className={style.checkbox}>
                                    <input type="checkbox"
                                           onChange={() => {props.selectToDo(e.id)}}
                                    />
                                </div>
                                <div className={style.toDoTitle}><h2>{e.title}</h2></div>
                                <div className={style.toDoDate}><span>{e.date}</span></div>
                                <div><p>{e.description}</p></div>
                                <div className={style.deleteButtonCont}>
                                    <Button variant={"danger"}>Delete</Button>
                                </div>
                            </div>
                        </Col>
                    )
                })


            }
        </Row>
    )
}
