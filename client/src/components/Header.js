import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

/* Global header for the app */
class Header extends Component {
	state = { navExpanded: false };

	setNavExpanded = expanded => {
		this.setState({ navExpanded: expanded });
	};

	closeNav = () => {
		this.setState({ navExpanded: false });
	};

	render() {
		return (
			// Return the navigation bar
			<Navbar
				expand="sm"
				variant="dark"
				fixed="top"
				className="header app_theme__header p-0 pt-1"
				onToggle={this.setNavExpanded}
				expanded={this.state.navExpanded}
			>
				{/* Brand logo and name */}
				<Navbar.Brand href="/" className="ml-2">
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
				<Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2" />
				{/* Collapsible navigation bar */}
				<Navbar.Collapse
					id="basic-navbar-nav"
					className="app_theme__header pl-2"
				>
					{/* Navigation */}
					<Nav className="ml-auto">
						{/* Home button */}
						<Nav.Item>
							<Link onClick={this.closeNav} to="/" className="nav-link">
								Home
							</Link>
						</Nav.Item>
						{/* Messages button */}
						<Nav.Item>
							<Link onClick={this.closeNav} to="/messages" className="nav-link">
								Messages
							</Link>
						</Nav.Item>
						{/* Sign in/ logout component */}
						<Nav.Item onClick={this.closeNav}>
							<GoogleAuth />
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;
