import React from 'react';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";


function headerTitle() {
    return (
        <Navbar.Header>
            <Navbar.Brand>
                <Link to='#'>Events Controll</Link>
            </Navbar.Brand>
        </Navbar.Header>
    );
}

export default headerTitle;