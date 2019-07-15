import React, { Component } from 'react';
import PropType from 'prop-types';
import { Card } from 'react-bootstrap';

class Message extends Component {
	static propTypes = {
		message: PropType.string.isRequired
	};
	render() {
		return (
			<Card className="app_theme__card m-1">
				<Card.Body>
					<Card.Text>{this.props.message}</Card.Text>
				</Card.Body>
			</Card>
		);
	}
}

export default Message;
