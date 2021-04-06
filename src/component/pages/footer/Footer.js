import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import logo from "../../../assets/img/logo.png";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

function Footer({isAuth}){
    console.log(isAuth)
    return(
        <footer className={'py-4 mt-5'}>
            <Container>
                <Row>
                    <Col md={4}>
                        <img src={logo} alt="logo" className={'img-fluid'} width={100} />
                    </Col>
                    <Col md={4}>
                        <h5 className={'footerHeadings'}>Pages</h5>
                        <ul className={'footerPageList mt-3'}>
                            <li>{isAuth && <Link to={'/'}>home</Link>}</li>
                            <li><Link to={'/about'}>about</Link></li>
                            <li><Link to={'/contacts'}>contact us</Link></li>
                            </ul>
                        </Col>
                    <Col md={4}>
                        <h5 className={'footerHeadings'}>Find Me</h5>
                        <div className={'mt-3'}>
                            <div style={{position: "relative",overflow: "hidden"}}><a
                                href="https://yandex.com/maps?utm_medium=mapframe&utm_source=maps"
                                style={{color:" #eee",fontSize:"12px",position:"absolute",top:"0px"}}>Yandex.Maps</a><a
                                href="https://yandex.com/maps/geo/772049455/?ll=44.291774%2C36.548415&utm_medium=mapframe&utm_source=maps&z=6.74"
                                style={{color: "#eee",fontSize:"12px",position:"absolute",top:"14px"}}>Yerevan — Yandex.Maps</a>
                                <iframe src="https://yandex.com/map-widget/v1/-/CCUUvKD2DA" width="100%" height="200"
                                        frameBorder="1" allowFullScreen={true} style={{position:"relative"}}></iframe>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>

    )
}


const mapStateToProps = (state)=>{
    return{
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps)(Footer)
