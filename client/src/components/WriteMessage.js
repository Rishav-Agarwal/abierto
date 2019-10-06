import React, { Component } from 'react';
import PropType from 'prop-types';
import { Button } from 'react-bootstrap';
import axios from '../utils/axios';

class WriteMessage extends Component {
	state = { msg: '' };

	static propTypes = {
		username: PropType.string.isRequired
	};

	handleMsgChange = val => this.setState({ msg: val });

	sendMessage = () => {
		axios().post('/user/send', {
			id: this.props.username,
			message: this.state.msg
		});
	};

	render() {
		return (
			<div className="d-flex flex-column">
				<textarea
					value={this.state.msg}
					ref="textareaMsg"
					className="bg-none p-2 w-100 text-light"
					placeholder="Write a message"
					rows="4"
					onChange={e => this.handleMsgChange(e.target.value)}
				/>
				<Button className="align-self-end my-2" onClick={this.sendMessage}>
					Send
				</Button>
			</div>
		);
	}
}

export default WriteMessage;
