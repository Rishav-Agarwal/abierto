import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import Header from './Header';
import HomePage from './HomePage';
import Messages from './Messages';
import Footer from './Footer';
import User from './User';
import EditProfile from './EditProfile';

// Get the stylesheet for our app
import '../App.css';
import '../responsive.css';

/* Starting point of our app */
class App extends Component {
	render() {
		return (
			// The container `div`'s height should cover the whole page
			// to make the main content cover whole page
			// and footer stick to its bottom
			<div className="d-flex flex-column h-100 app_theme">
				{/* Header */}
				<Header />

				{/* Main content */}
				<div className="main-content">
					<Switch>
						{/*
						 * Route for `/`(root)
						 */}
						<Route exact path="/" component={HomePage} />

						{/*
						 * Route for messages received by the user
						 */}
						<PrivateRoute
							exact
							path="/messages"
							component={Messages}
							isLoggedIn={this.props.isLoggedIn}
						/>

						{/*
						 * Route to show profile of a different user
						 */}
						<Route exact path="/u/:id" component={User} />

						<PrivateRoute
							exact
							path="/edit"
							component={EditProfile}
							isLoggedIn={this.props.isLoggedIn}
						/>

						<Route path="/" render={() => <h1>Not found!</h1>} />
					</Switch>
				</div>

				{/* Footer */}
				<Footer />
			</div>
		);
	}
}

// Get the required props from the state
const mapStateToProps = state => {
	return {
		// If user is logged in
		isLoggedIn: state.loggedIn,
		// If user has been verified by the server
		verified: state.verified
	};
};

export default connect(
	/* State */
	mapStateToProps
)(App);
