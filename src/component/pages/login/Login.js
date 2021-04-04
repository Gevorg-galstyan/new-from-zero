import React, {useState} from "react";
import {Form, Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import style from '../../../assets/css/error.module.css';
import {login} from "../../../store/actions";
import {connect} from "react-redux";

function Login({login}) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        email: null,
        password: null,
    })

    const handleInput = ({target: {name, value}}) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        if (!value || value.trim() === '') {
            setError({
                ...error,
                [name]: 'Field is required',

            })
        } else {
            setError({
                ...error,
                [name]: null,
            })
        }

        if (name === 'email' && !emailRegex.test(value) && value) {
            setError({
                ...error,
                [name]: 'Incorrect Email Address',
            })
        }

        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if((error.email || error.password) || (values.email === '' || values.password === '')){
            return false;
        }

        login(values)

    }
    return (
        <Container className={'h-100'}>
            <Row className={'align-items-center h-100 justify-content-center'}>
                <Col md={6}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name={'email'}
                            placeholder="Ex. Jhon@somemail.com"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.email}</span>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name={'password'}
                            placeholder="Enter your password"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.password}</span>
                    </Form.Group>
                    <div className={'text-center'}>
                        <Button
                            onClick={handleSubmit}
                        >Login</Button>
                    </div>
                    <div className={'text-center mt-2'}>
                        if you don't have an account please <Link to={'/register'}>Register</Link>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}


const mapDispatchToProps = {
    login,
}


export default connect(null, mapDispatchToProps)(Login)