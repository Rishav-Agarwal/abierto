import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Image, Row, Col, Button, Toast } from 'react-bootstrap';

import PleaseWait from './PleaseWait';
import axios, { baseurl } from '../utils/axios';

/* This component shows the user profile */
class Profile extends Component {
	state = {
		user: {},
		// Show the username copied toast
		showCopyToast: false
	};

	static propTypes = {
		username: PropType.string.isRequired
	};

	componentDidMount = () => {
		const username = this.props.username;
		// If viewing other's profile, get the details
		if (username !== 'self')
			axios()
				.get(`/user/check/${username}`)
				.then(res => {
					this.setState({ user: res.data });
				});
	};

	// Copy the username to the clipboard and show the toast
	shareProfile = () => {
		const username =
			this.props.username !== 'self' ? this.state.user.id : this.props.user.id;
		navigator.clipboard.writeText(baseurl + '/u/' + username);
		this.setState({ showCopyToast: true });
	};

	render() {
		const user =
			this.props.username !== 'self' ? this.state.user : this.props.user;
		if (!user || !user.id) return <h1>Loading...</h1>;
		return (
			<>
				{/* Bootstrap container for user profile*/}
				<Container className="py-2 app_theme__card profile">
					{/* Row for profile */}
					<Row>
						{/* Column for profile */}
						{// If user is logged in and defined, show the profile
						// Else, show please wait button
						this.props.username !== 'self' || user ? (
							// User logged in and defined, show the profile

							// Return react fragment as it eliminates extra `div`
							// which may unnecessarily nest the DOM tree
							<>
								{/* Profile image with initial edge length of 72px
								 *
								 * Side length increases with screen size
								 */}
								<Col xs={12} md={3} className="d-flex justify-content-center">
									<Image
										// Get the profile picture from user data
										src={user.picture}
										width="72"
										height="72"
										roundedCircle
										className="profile__pic"
									/>
								</Col>
								<Col
									xs={12}
									md={9}
									className="d-flex flex-column justify-content-center"
								>
									{/* User's name and share button */}
									<div className="text-center">
										{/* User's name - from user data */}
										<span className="h5 m-1 p-1">{user.name}</span>
										{/* Share user profile button */}
										<Button
											variant="outline-danger"
											className="p-1"
											onClick={() => {
												this.shareProfile();
											}}
											style={{ fontSize: '10px' }}
										>
											{/* Font awesome share image */}
											<span className="mr-1 profile__share">
												<i className="fas fa-share-alt"></i>
											</span>
											Share
										</Button>
									</div>
									{/* Show the unique username */}
									<Link
										ref="username"
										className="w-100 mb-0 text-center word-wrap-break"
										style={{ color: '#FF8A80' }}
										to={'/u/' + user.id}
									>
										{user.id}
									</Link>
									{/* Show user's about me */}
									<p className="color-light text-center">{user.about}</p>
								</Col>
							</>
						) : (
							// User not loaded, show please wait button
							<PleaseWait />
						)}
					</Row>
				</Container>

				{/* Show when the username is copied */}
				<Toast
					className="mx-auto my-2 app_theme"
					onClose={() => this.setState({ showCopyToast: false })}
					show={this.state.showCopyToast}
					delay={2000}
					autohide
				>
					<Toast.Header className="app_theme__card">
						<strong className="mr-auto">Username copied</strong>
					</Toast.Header>
				</Toast>
			</>
		);
	}
}

// Get the required props from the state
const mapStateToProps = state => {
	return {
		// The user data
		user: state.user
	};
};

export default connect(
	/* State */
	mapStateToProps
)(Profile);
