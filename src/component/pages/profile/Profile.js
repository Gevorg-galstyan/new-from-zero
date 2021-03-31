import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {getUserInfo} from "../../../store/actions";
import {Button, Col, Container, Row} from "react-bootstrap";
import EditUser from "../../modals/EditUser";
import user from '../../../assets/img/user-default.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

function Profile({userInfo, isAuth, getUserInfo}) {
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (isAuth) {
            getUserInfo();
        }
    }, [])


    return (
        <>
            <Container>
                <Row className={'mt-5'}>
                    <Col md={6}>
                        <img src={(userInfo && userInfo.image)? userInfo.image:user} alt="" className={'img-fluid'}/>
                    </Col>
                    <Col md={6}>
                        <div className={'d-flex align-items-center justify-content-center'}>
                            <h1 className={'m-auto'}>{userInfo && userInfo.name} {userInfo && userInfo.surname}</h1>
                            <Button variant="" onClick={() => setModalShow(true)}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </Button>
                        </div>

                    </Col>
                </Row>
            </Container>

            {
                modalShow &&
                <EditUser
                    onHide={setModalShow}
                    show={modalShow}
                />

            }

        </>
    )
}


const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        userInfo: state.userInfo,
        loading: state.loading
    }
}
const mapDispatchToProps = {
    getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)