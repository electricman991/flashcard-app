import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import '../index.css';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'react-bootstrap';

function Base() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar className='bg-blue-300' expand="md" expanded={isOpen} onToggle={toggle}>
            <div className="container-fluid">
                <NavbarBrand as={Link} to="/">Flashcard App</NavbarBrand>
                <Navbar.Toggle onClick={toggle} />
                <Navbar.Collapse >
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink as={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink as={Link} to="/about">About</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default Base;
