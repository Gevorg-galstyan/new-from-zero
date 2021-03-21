import React, {useState} from "react";
import {Form, Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import style from '../../../assets/css/error.module.css';

export default function Login() {
    const [values, setValues] = useState({
        login: '',
        password: '',
    })
    const [error, setError] = useState({
        login: null,
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

        if (name === 'login' && !emailRegex.test(value) && value) {
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
        if((error.login || error.password) || (values.login === '' || values.password === '')){
            return false;
        }

        console.log('login')
        //LOGIN ACTION
    }
    return (
        <Container className={'h-100'}>
            <Row className={'align-items-center h-100 justify-content-center'}>
                <Col md={6}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name={'login'}
                            placeholder="Enter email"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.login}</span>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name={'password'}
                            placeholder="Password"
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
                        <Link to={'/register'}>Or Register</Link>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}