import React, {memo} from "react";
import {Container, Row} from "react-bootstrap";

function About() {

    return (
        <Container className={'mt-5'}>
            <Row className={'justify-content-center'}>
                <h1 className={'text-center w-100'}>About Me</h1>
                <p className={'mt-5 col-md-8 fw-600'}>
                    Hello reader.
                    <br/>
                    My name is Gevorg and I am a front-end developer.
                    <br/>
                    The project you are watching, my first creation using react.js. The project uses redux, react
                    router, PropTypes and many other react packages.

                    The main functionality of the project consists of adding, editing and deleting a list of tasks,
                    registration, authorization and authentication and search for tasks with different filtering.
                    <br/>
                    I ask you not to judge harshly, because this is my first project and for a professional it may seem,
                    that it is very primitive, but for me my project is a great achievement and the beginning of the
                    path to the endless world of programming.

                </p>
            </Row>
        </Container>

    )
}

export default memo(About)