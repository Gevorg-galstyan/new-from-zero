import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Button, Modal, Form} from "react-bootstrap";
import {updateUserInfo} from "../../store/actions";

function EditUser(props) {
    const [user, setUser] = useState({
        name: '',
        surname: ''
    });
    const [err, setErr] = useState({
        name: '',
        surname:''
    });

    useEffect(() => {
        if (props.isAuth) {
            setUser(props.user)
        }
    }, []);

    const handleChange = ({target})=>{

        if(target.name === 'image'){
            let file = target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    setUser({
                        ...user,
                        [target.name]: reader.result,
                    });
                };
            }
        }
        if(target.value.trim() === '' && target.name !== 'image'){
            setErr({
                ...err,
                [target.name]: 'This Field is Required'
            })
        }

        setUser({
            ...user,
            [target.name]: target.value
        })
    };

    const handleEdit = () => {
        const val = Object.values(user),
            hasVal = !val.some(e => e === '');
        if (!hasVal) {
            setErr({
                title: user.name ? null : 'Пожалуйста заполните поле',
                year: user.surname ? null : 'Пожалуйста заполните поле',
            })
            return false;
        }

        props.updateUserInfo(user)
        props.onHide(false)
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name={'name'}
                        value={user.name}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        {err.name}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your surname"
                        name={'surname'}
                        value={user.surname}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        {err.surname}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="img">
                    <Form.Label>Avatar</Form.Label>
                    <div className={'d-flex align-items-center'}>
                        <Form.Control
                            type="file"
                            name={'image'}
                            onInput={handleChange}
                            accept={'.jpeg, .jpg, .png'}
                            className={'col-5'}
                        />
                        {
                            user.image !== '' &&
                            <img src={user.image} alt="" width={50}/>
                        }
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> props.onHide(false)}>Cancel</Button>
                <Button onClick={handleEdit}>Edit</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapDispatchToProps = {
    updateUserInfo
}
const mapStateToProps = (state) => {
    return {
        user: state.userInfo,
        isAuth: state.isAuth,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditUser)
