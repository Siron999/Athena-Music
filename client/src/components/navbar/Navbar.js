import React from 'react';
import {Navbar, Nav, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import './navbar.css';

export const NavbarComponent = () => {
    return (
        <Navbar className={"sidebarContainer d-flex flex-column justify-content-center align-items-center p-0"} dark>
            <Nav vertical className={"mb-auto mt-5 d-flex align-items-center"}>
                <NavItem>
                    <NavLink tag={Link} className={"nav py-0 d-flex align-items-center justify-content-center"}
                             to={""}>
                        <div className={"d-flex flex-column align-items-center"}>
                            <i className={'fas fa-home fa-2x '}></i>
                            <p>Home</p>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className={"nav py-0 d-flex align-items-center justify-content-center"}
                             to={"/add"}>
                        <div className={"d-flex flex-column align-items-center"}>
                            <i className="fas fa-search"></i>
                            <p>Add</p>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className={"nav py-0 d-flex align-items-center justify-content-center"}
                             to={"/"}>
                        <div className={"d-flex flex-column align-items-center"}>
                            <i className="fas fa-list"></i>
                            <p>Library</p>
                        </div>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}