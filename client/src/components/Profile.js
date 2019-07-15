import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';

import PleaseWait from './PleaseWait';

/* This component shows the user profile */
class Profile extends Component {
	render() {
		return (
			// Bootstrap container for user profile
			<Container className="py-2 app_theme__card">
				{/* Row for profile */}
				<Row>
					{/* Column for profile */}
					{// If user is logged in and defined, show the profile
					// Else, show please wait button
					this.props.user ? (
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
									src={this.props.user.picture}
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
									<span className="h5 m-1 p-1">{this.props.user.name}</span>
									{/* Share user profile button */}
									<Button
										variant="outline-danger"
										className="p-1"
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
								<p
									className="w-100 mb-0 text-center word-wrap-break"
									style={{ color: '#FF8A80' }}
								>
									{this.props.user._id}
								</p>
								{/* Show user's about me */}
								<p className="color-light text-center">
									{this.props.user.about}
								</p>
							</Col>
						</>
					) : (
						// User not loaded, show please wait button
						<PleaseWait />
					)}
				</Row>
			</Container>
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
