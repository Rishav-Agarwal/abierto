import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

import axios from '../utils/axios';
import Message from './Message';

class ListMessages extends Component {
	state = {
		messages: []
	};

	componentDidMount = () => {
		axios()
			.get('/user/messages')
			.then(res => this.setState({ messages: res.data.messages }));
	};

	render() {
		return (
			<Container>
				<h5 className="m-3" style={{ color: '#FF8A80' }}>
					<FaPaperPlane /> Messages
				</h5>
				{this.state.messages.map(message => (
					<Message key={message._id} message={message.message} />
				))}
			</Container>
		);
	}
}

export default ListMessages;
