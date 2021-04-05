import React, {useEffect, useState} from "react";
import {Col, Container, Row, Form, Button} from "react-bootstrap";
import {connect} from 'react-redux'
import {sendMessage} from "../../../store/actions";

function Contacts({sendMessage, messageSuccess}) {
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

    useEffect(()=>{
        if(messageSuccess){
            setValues({
                name: '',
                email: '',
                message: ''
            })
        }
    }, [messageSuccess])

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
        const hasVal = !val.some(e => e === ''),
            hasErr = !err.every(e => e === null);
        if (!hasErr && hasVal) {
            const body = {
                name: values.name.trim(),
                email: values.email.trim(),
                message: values.message.trim(),
            }

            sendMessage(body);

            if (messageSuccess) {
                setValues({
                    name: '',
                    email: '',
                    message: ''
                })
            }

        }

        if (!hasVal && !hasErr) {
            setErrors({
                name: values.name ? null : 'Field is required',
                email: values.email ? null : 'Field is required',
                message: values.message ? null : 'Field is required'

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
                            <Form.Text className="text-danger text-bold">
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
                            <Form.Text className="text-danger text-bold">
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
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = {
    sendMessage
}
const mapStateToProps = (state) => {
    return {
        messageSuccess: state.messageSuccess
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)