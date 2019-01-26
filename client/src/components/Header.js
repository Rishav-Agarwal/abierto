import React, { Component } from 'react';
import { Navbar, Nav } from "react-bootstrap";
import GoogleAuth from './GoogleAuth';

/* Global header for the app */
class Header extends Component {

  render() {
    return (
      // Return the navigation bar
      <Navbar bg="dark" variant="dark" fixed="top" className="header">
        {/* Brand logo and name */}
        <Navbar.Brand href="/">
          {/* Brand logo */}
          <img
            src="/favicon.ico"
            alt="app logo"
            width="30" height="30"
            className="d-inline-block align-top mr-2" />
          {/* Brand name */}
          <span>abierto</span>
        </Navbar.Brand>
        {/* Navigation bar's toggle button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Collapsible navigation bar */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation */}
          <Nav className="ml-auto">
            {/* Home button */}
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {/* Sign in/Logout button */}
              <GoogleAuth />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;