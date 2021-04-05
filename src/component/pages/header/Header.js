import React, {useState, useEffect} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../../helpers/auth";
import style from './headerStyle.module.css'

function Header({isAuth, userInfo}) {
    const [show, setShow] = useState(false);

    const showDropdown = () => {
        setShow(!show);
    }
    const hideDropdown = () => {
        setShow(false);
    }
    useEffect(() => {
        hideDropdown();
    }, [isAuth])
    return (
        <Navbar bg="white" variant="light">
            <NavLink
                to="/"
                activeClassName={style.active}
                className={'navbar-brand'}
                exact
            >ToDo List</NavLink>
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
                    isAuth ?

                        <NavDropdown
                            title={userInfo && userInfo.name}
                            id="service-dropdown"
                            className={'nav-link'}
                            show={show}
                            onMouseEnter={showDropdown}
                            onMouseLeave={hideDropdown}
                        >
                            <div>
                                <NavLink
                                    to="/profile"
                                    activeClassName={style.active}
                                    exact
                                >
                                    Profile
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/settings"
                                    activeClassName={style.active}
                                    exact
                                >
                                    Settings
                                </NavLink>
                            </div>

                            <div>
                                <a
                                    href={''}
                                    onClick={logout}
                                >
                                    Log Out
                                </a>
                            </div>

                        </NavDropdown>


                        :
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
        isAuth: state.isAuth,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(Header)