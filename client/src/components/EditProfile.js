import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import axios from '../utils/axios';

import { changeUserData } from '../actions';

class EditProfile extends Component {
	state = {
		user: {},
		name: '',
		username: '',
		about: '',
		// Store error in the name entered
		nameError: '',
		// Store error in the username entered
		usernameError: '',
		successMsg: ''
	};

	handleNameChange = name => this.setState({ name, nameError: '' });

	handleUsernameChange = username =>
		this.setState({ username, usernameError: '' });

	handleAboutChange = about => this.setState({ about });

	successMsgTimeout = null;

	// When user submits the new info, validate and update them
	updateProfile = e => {
		e.preventDefault();

		let { name, username, about } = this.state;
		let valid = true;

		// Validate name- Length
		name = name.trim();
		if (name.length !== 0 && (name.length < 2 || name.length > 100)) {
			this.setState({
				nameError: 'Name length should be atleast 2 and maximmum 100'
			});
			valid = false;
		}

		// Validate username- Length, Pattern
		username = username.trim();
		// Check length
		if (
			username.length !== 0 &&
			(username.length < 2 || username.length > 20)
		) {
			this.setState({
				usernameError: 'Username length should be atleast 2 and maximum 20'
			});
			valid = false;
		}
		// Check pattern
		if (username.length !== 0 && !/^[a-zA-Z0-9_]+$/.test(username)) {
			this.setState({
				usernameError:
					'Username can contain only alphaumeric characters and underscore(_)'
			});
			valid = false;
		}

		// If everything's not perfect, return
		if (!valid) return;

		// Everything is ok, update the info
		axios()
			.put('/user/update', { name, username, about })
			.then(res => {
				// Update only values that has been changed by the user
				const newVals = {};
				if (name.length) newVals.name = name;
				if (about.length) newVals.about = about;
				if (username.length) newVals.id = username;
				// Update the user data state
				this.props.changeUserData({
					...this.props.user,
					...newVals
				});
				// Notify user about the change
				this.setState({ successMsg: 'Updated successfully' });
				this.successMsgTimeout = setTimeout(() => {
					this.setState({ successMsg: '' });
				}, 3000);
			})
			.catch(err => {
				this.setState(err.response.data);
			});
	};

	componentWillUnmount = () => clearTimeout(this.successMsgTimeout);

	render() {
		return (
			<div className="m-auto col-12 col-sm-9 col-md-8 col-lg-6">
				<Form>
					{/* Heading */}
					<h2>Edit profile</h2>
					{/* Description */}
					<Form.Text className="text-muted font-italic">
						Fill only the fields you want to change
					</Form.Text>

					{/* Name of the user */}
					<Form.Group controlId="formName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							style={{ background: '#33333333', color: '#eee' }}
							type="Text"
							placeholder="Enter name"
							value={this.state.name}
							onChange={e => this.handleNameChange(e.target.value)}
						/>
						<Form.Text className="text-danger">
							{this.state.nameError}
						</Form.Text>
					</Form.Group>

					{/* Username of the user */}
					<Form.Group controlId="formUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control
							style={{ background: '#33333333', color: '#eee' }}
							type="text"
							placeholder="Username"
							value={this.state.username}
							onChange={e => this.handleUsernameChange(e.target.value)}
						/>
						<Form.Text className="text-danger">
							{this.state.usernameError}
						</Form.Text>
					</Form.Group>

					{/* About the user */}
					<Form.Group controlId="formAbout">
						<Form.Label>About</Form.Label>
						<Form.Control
							style={{ background: '#33333333', color: '#eee' }}
							type="text"
							placeholder="About"
							value={this.state.about}
							onChange={e => this.handleAboutChange(e.target.value)}
						/>
					</Form.Group>
					{/* Submit the changes */}
					<Button variant="primary" type="submit" onClick={this.updateProfile}>
						Submit
					</Button>
					{/* Success text shown if updates successfully */}
					<Form.Text className="text-success">
						{this.state.successMsg}
					</Form.Text>
				</Form>
			</div>
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
	mapStateToProps,
	/* Action creators */
	{ changeUserData }
)(EditProfile);
