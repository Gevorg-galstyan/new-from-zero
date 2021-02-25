import React, {memo} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import style from './headerStyle.module.css'

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
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
        </Navbar>
    )
}

export default memo(Header)