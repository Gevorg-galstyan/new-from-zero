import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserInfo} from "../../../store/actions";
import {Col, Container, Row} from "react-bootstrap";

function Profile({userInfo, isAuth, getUserInfo}) {

    useEffect(() => {
        if (isAuth) {
            getUserInfo();
        }
    }, [])

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src="" alt=""/>
                </Col>
                <Col md={6}>
                    <h1>{userInfo && userInfo.name} {userInfo && userInfo.surname}</h1>
                </Col>
            </Row>
        </Container>

    )
}


const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = {
    getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)