import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class EditProfile extends Component {
	render() {
		return (
			<div>
				<Form>
					<Form.Group controlId="formName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="Text" placeholder="Enter name" />
					</Form.Group>

					<Form.Group controlId="formUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" placeholder="Username" />
					</Form.Group>

					<Form.Group controlId="formAbout">
						<Form.Label>About</Form.Label>
						<Form.Control type="text" placeholder="About" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default EditProfile;
