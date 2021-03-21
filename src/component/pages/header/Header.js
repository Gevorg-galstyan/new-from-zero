import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import style from './headerStyle.module.css'

function Header({isAuth}) {
    return (
        <Navbar bg="white" variant="light">
            <Navbar.Brand href="#home">ToDo List</Navbar.Brand>
            <Nav className="mr-auto">
                {
                    isAuth &&
                    <NavLink
                        to="/"
                        activeClassName={style.active}
                        className={style.headerNav}
                        exact
                    >
                        Home
                    </NavLink>
                }
                <NavLink
                    to="/about"
                    activeClassName={style.active}
                    className={style.headerNav}
                    exact

                >
                    About Us
                </NavLink>
                <NavLink
                    to="/contacts"
                    activeClassName={style.active}
                    className={style.headerNav}
                    exact
                >
                    Contact Us
                </NavLink>
            </Nav>
            <div className={'ml-auto'}>
                {
                    isAuth ? <Button>Log Out </Button> :
                        <>
                            <NavLink
                                to="/login"
                                activeClassName={style.active}
                                className={style.headerNav}
                                exact
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                activeClassName={style.active}
                                className={style.headerNav}
                                exact
                            >
                                Register
                            </NavLink>
                        </>
                }
            </div>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps)(Header)