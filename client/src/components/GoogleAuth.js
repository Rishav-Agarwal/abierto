import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button } from 'react-bootstrap';
import axios, { setAuthToken, getAuthToken } from '../utils/axios';

import PleaseWait from './PleaseWait';

import {
	changeLoginState,
	changeVerifyState,
	changeUserData
} from '../actions';

/* Component which handles all the task required for user signin/logout */
class GoogleAuth extends Component {
	// If user couldn't be verified by the server, this function is called to logout the user
	logout = () => {
		const auth2 = window.gapi.auth2.getAuthInstance();
		if (auth2 != null) {
			auth2.signOut().then(this.onLogoutSuccess);
		}
	};

	// If login is successful, this function is called
	onLoginSuccess = googleRes => {
		// User signed in sucessfully, change login state to `true`
		this.props.changeLoginState(true);

		// After successful login, verify the user by the server
		// by sending the user's id token recieved by Google
		setAuthToken(googleRes.getAuthResponse().id_token);
		axios()
			.post('/user/create', {
				id_token: getAuthToken()
			})
			.then(res => {
				// Verification successful! Update state and user data
				this.props.changeVerifyState(true);
				this.props.changeUserData(res.data);
				if (this.props.location.state)
					this.props.history.push(this.props.location.state.from.pathname);
			})
			.catch(err => {
				// Verification error!(Either mongodb or token verification)
				this.props.changeVerifyState(false);
				this.props.changeUserData(null);
				// Since verification failed, logout the user from the app
				this.logout();
			});
	};

	// If login fails, this function is called
	onLoginFailure = googleRes => {
		// Sign in error, set login state to `false`
		this.props.changeLoginState(false);
		this.props.changeUserData(null);
	};

	// If logout is successful, this function is called
	onLogoutSuccess = googleRes => {
		// Logout successful, change login state to `false`
		this.props.changeLoginState(false);
		this.props.changeUserData(null);
	};

	render() {
		return (
			/* Signin/logout button */
			<div>
				{/*
				 * If user is logged in as well as verified, show the logout button
				 * If user is logged in but not verified, show please wait button
				 * If user is not logged in, show sign in button
				 */}
				{this.props.loggedIn ? (
					// User has logged in
					this.props.verified ? (
						// User logged in as well as verified, show logout button
						<GoogleLogout
							buttonText="Logout"
							onLogoutSuccess={this.onLogoutSuccess}
							// Custom logout buton design
							render={renderProps => (
								<Button
									variant="danger"
									onClick={renderProps.onClick}
									className="m-1"
								>
									Logout
								</Button>
							)}
						/>
					) : (
						// User logged in but not verified, show please wait button
						<PleaseWait />
					)
				) : (
					// If user is not logged in, show the sign in button
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID}
						onSuccess={this.onLoginSuccess}
						onFailure={this.onLoginFailure}
						// If user is signed in, call `onSuccess`
						isSignedIn={true}
						// Custom sign in buton design
						render={renderProps => (
							<Button
								variant="primary"
								onClick={renderProps.onClick}
								className="m-1"
							>
								Sign in
							</Button>
						)}
					/>
				)}
			</div>
		);
	}
}

// Get the required props from the state
const mapStateToProps = state => {
	return {
		// If user is logged in
		loggedIn: state.loggedIn,
		// If user is verified by the server
		verified: state.verified
	};
};

export default withRouter(
	connect(
		/* State */
		mapStateToProps,
		/* Action creators */
		{
			changeLoginState,
			changeVerifyState,
			changeUserData
		}
	)(GoogleAuth)
);
