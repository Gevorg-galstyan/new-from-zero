import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import style from '../../../assets/css/error.module.css';

export default function Register() {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        login: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState({
        name: null,
        surname: null,
        login: null,
        password: null,
        confirmPassword: null,
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
        if (name === 'password' && value.length < 6) {
            setError({
                ...error,
                [name]: 'Password must be at least 6 characters',
            })
        }
        if (name === 'confirmPassword' && value !== values.password) {
            setError({
                ...error,
                [name]: 'Password and confirmation do not match',
            })
        }

        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = () => {
        for(let i in error){
            if(error[i] !== null || values[i] === ''){
                return false
            }
        }


        console.log('register')
        //REGISTER ACTION
    }

    return (
        <Container className={'h-100'}>
            <Row className={'align-items-center h-100 justify-content-center'}>
                <Col md={6}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control
                            type="text"
                            name={'name'}
                            placeholder="Your name"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.name}</span>
                    </Form.Group>
                    <Form.Group controlId="formGroupSurName">
                        <Form.Label>Your surname</Form.Label>
                        <Form.Control
                            type="text"
                            name={'surname'}
                            placeholder="Your surname"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.surname}</span>
                    </Form.Group>
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
                    <Form.Group controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name={'confirmPassword'}
                            placeholder="Confirm Password"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.confirmPassword}</span>
                    </Form.Group>
                    <div className={'text-center'}>
                        <Button
                            onClick={handleSubmit}
                        >Register</Button>
                    </div>
                    <div className={'text-center mt-2'}>
                        <Link to={'/login'}>Or Login</Link>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}