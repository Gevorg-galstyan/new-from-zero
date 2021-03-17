import React, {memo} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import style from './headerStyle.module.css'

function Header() {
    return (
        <Navbar bg="white" variant="light">
            <Navbar.Brand href="#home">ToDo List</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                    to="/"
                    activeClassName={style.active}
                    className={style.headerNav}
                    exact
                >
                    Home
                </NavLink>
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
                <NavLink
                    to="/counter"
                    activeClassName={style.active}
                    className={style.headerNav}
                    exact
                >
                    Counter
                </NavLink>

            </Nav>
            <div className={'ml-auto'}>
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
            </div>
        </Navbar>
    )
}

export default memo(Header)