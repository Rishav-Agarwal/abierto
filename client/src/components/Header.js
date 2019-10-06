import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

/* Global header for the app */
class Header extends Component {
	render() {
		return (
			// Return the navigation bar
			<Navbar variant="dark" fixed="top" className="header app_theme">
				{/* Brand logo and name */}
				<Navbar.Brand href="/">
					{/* Brand logo */}
					<img
						src="/favicon.ico"
						alt="app logo"
						width="30"
						height="30"
						className="d-inline-block align-top mr-2"
					/>
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
							<Link to="/" className="nav-link">
								Home
							</Link>
						</Nav.Item>
						{/* Messages button */}
						<Nav.Item>
							<Link to="/messages" className="nav-link">
								Messages
							</Link>
						</Nav.Item>
						{/* Sign in/ logout component */}
						<Nav.Item>
							<GoogleAuth />
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;
