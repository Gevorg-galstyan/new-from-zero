import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {onPageLoad} from "../../../store/actions";
import {register} from "../../../store/actions";
import {connect} from "react-redux";


import style from '../../../assets/css/error.module.css';

function Register(props) {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState({
        name: null,
        surname: null,
        email: null,
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

        if (name === 'email' && !emailRegex.test(value) && value) {
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
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const val = Object.values(values),
            err = Object.values(error),
            hasVal = !val.some(e => e === ''),
            hasErr = err.every(e => e === null);

        if (!hasErr || !hasVal) {
            setError({
                name: values.name ? null :  'Field is required',
                surname: values.surname ? null : 'Field is required',
                email: (values.email && emailRegex.test(values.email)) ? null : !emailRegex.test(values.email) ? 'Incorrect Email Address' : 'Field is required',
                password: values.password && values.password.length >= 6 ?
                    null :
                    values.password.length < 6 ? 'Password must be at least 6 characters' :
                        'Field is required',
                confirmPassword: (values.confirmPassword && values.confirmPassword === values.password) ?
                    null :
                    (values.confirmPassword !== values.password) ?
                        'Password and confirmation do not match' :
                        'Field is required',
            })

            return false;
        }
        props.register(values)
    }

    return (
        <Container className={'h-100'}>
            <Row className={'align-items-center h-100 justify-content-center'}>
                <Col md={6}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name={'name'}
                            placeholder="ex. Jhon"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.name}</span>
                    </Form.Group>
                    <Form.Group controlId="formGroupSurName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name={'surname'}
                            placeholder="ex. Doe"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.surname}</span>
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name={'email'}
                            placeholder="ex. jhondoe@somemail.com"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.email}</span>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name={'password'}
                            placeholder="Enter a strong password"
                            onInput={handleInput}
                        />
                        <span className={style.error}>{error.password}</span>
                    </Form.Group>
                    <Form.Group controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm</Form.Label>
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
                        If you already have an account, please <Link to={'/login'}>Login</Link>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}


const mapDispatchToProps = {
    register,
}


export default connect(null, mapDispatchToProps)(Register)