import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {updatePassword, getUserInfo} from "../../../store/actions";
import {Container, Row, Form, Button} from "react-bootstrap";

function Settings({getUserInfo, updatePassword, isAuth, clearPasswordInputs}) {

    const [password, setPassword] = useState({
        oldPassword : '',
        newPassword : '',
        confirmNewPassword : '',
    })
    const [error, setError] = useState(null)

    useEffect(()=>{
        if(isAuth){
            getUserInfo()
        }

    },[])

    useEffect(()=>{
        if(clearPasswordInputs){
            setPassword({
                oldPassword : '',
                newPassword : '',
                confirmNewPassword : '',
            })
        }

    },[clearPasswordInputs])

    const handleChange = ({target}) => {

        if (!target.value || target.value.trim() === '') {
            setError({
                ...error,
                [target.name]: 'Field is required',
            })
        } else {
            setError({
                ...error,
                [target.name]: null,
            })
        }

        if (target.name === 'newPassword' && target.value.length < 6) {
            setError({
                ...error,
                [target.name]: 'Password must be at least 6 characters',
            })
        }
        if (target.name === 'confirmNewPassword' && target.value !== password.newPassword) {
            setError({
                ...error,
                [target.name]: 'Password and confirmation do not match',
            })
        }

        setPassword({
            ...password,
            [target.name]: target.value
        })

    }
    const handleSubmit = () => {
        const val = Object.values(password),
            err = Object.values(error),
            hasVal = !val.some(e => e === ''),
            hasErr = !err.some(e => e === null);

        if (!hasVal && !hasErr) {
            setError({
                oldPassword: password.oldPassword ? null : 'Field is required',
                newPassword: password.newPassword ? null : 'Field is required',
                confirmNewPassword: password.confirmNewPassword ? null : 'Field is required',
            })
            return false;
        }

        updatePassword(password)
    }

    return (
        <Container>
            <Row className={'justify-content-center mt-5'}>
                <Form.Group className={'col-lg-4'} controlId="oldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        name={'oldPassword'}
                        placeholder="Please enter your old password"
                        onChange={handleChange}
                        value={password.oldPassword}
                    />
                    <Form.Text className="text-muted text-center color-red">
                        {error && error.oldPassword}
                    </Form.Text>
                </Form.Group>
                <Form.Group className={'col-lg-4'} controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name={'newPassword'}
                        placeholder="Enter a new password"
                        onChange={handleChange}
                        value={password.newPassword}
                    />
                    <Form.Text className="text-muted text-center color-red">
                        {error && error.newPassword}
                    </Form.Text>
                </Form.Group>
                <Form.Group className={'col-lg-4'} controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name={'confirmNewPassword'}
                        placeholder="Confirm your new  password"
                        onChange={handleChange}
                        value={password.confirmNewPassword}
                    />
                    <Form.Text className="text-muted text-center color-red">
                        {error && error.confirmNewPassword}
                    </Form.Text>
                </Form.Group>
                <div className={'mt-4'}>
                    <Button variant="warning" onClick={handleSubmit}>Change Password</Button>
                </div>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = {
    updatePassword,
    getUserInfo
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        isAuth: state.isAuth,
        clearPasswordInputs: state.clearPasswordInputs,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings)