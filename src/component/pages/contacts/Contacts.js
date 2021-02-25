import React, {memo, useState} from "react";
import {Col, Container, Row, Form, Button, Alert} from "react-bootstrap";
import style from './contactStyle.modul.css';

function Contacts() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    })
    const [alertMessages, setAlertMessages] = useState({
        errorMessage: false,
        successMessage: false,
    })

    const handleChange = ({target: {name, value}}) => {

        if (!value || value.trim() === '') {
            setErrors({
                ...errors,
                [name]: 'Field is required'
            })
        } else {
            setErrors({
                ...errors,
                [name]: null
            })
        }

        const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (name === 'email' && !emailReg.test(value) && value) {
            setErrors({
                ...errors,
                [name]: 'Incorrect Email Address'
            })
        }

        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleClick = () => {
        const val = Object.values(values),
            err = Object.values(errors);
        const hasVal = !val.some(e => e.trim() === ''),
            hasErr = !err.every(e => e === null);
        // console.log(hasErr,hasVal)
        if (!hasErr && hasVal) {
            // console.log(hasErr,hasVal)
            const body = {
                name: values.name.trim(),
                email: values.email.trim(),
                message: values.message.trim(),
            }
            // console.log(body)
            fetch(`http://localhost:3001/form`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            })
                .then((e) => e.json())
                .then((res) => {
                    if (res.success) {
                        setAlertMessages({
                            errorMessage: false,
                            successMessage: true
                        })
                    } else {
                        throw new Error('Sorry something went wrong ')
                    }
                })
                .catch((err) => {
                    setAlertMessages({
                        successMessage: false,
                        errorMessage: true
                    })
                })

        } else {
            setErrors({
                name: 'Field is required',
                email: 'Field is required',
                message: 'Field is required'
            })
        }

    }

    return (
        <Container>
            <Row className={'justify-content-center'}>
                <Col md={8}>
                    <h1 className={'text-center'}>Contact Us</h1>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={values.name}
                                name={'name'}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted text-bold">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                value={values.email}
                                name={'email'}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted text-bold">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter your Message"
                                rows={5}
                                value={values.message}
                                name={'message'}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger text-bold">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                variant="primary"
                                onClick={handleClick}
                            >
                                Submit
                            </Button>
                        </div>
                        <div className={'mt-4'}>
                            {
                                alertMessages.successMessage &&
                                <Alert variant={'primary '}>
                                    Your Message has been send
                                </Alert>
                            }
                            {
                                alertMessages.errorMessage &&
                                <Alert variant={'danger'}>
                                    Your Message Not send
                                </Alert>
                            }
                        </div>


                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default memo(Contacts)