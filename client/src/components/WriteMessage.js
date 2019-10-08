import React, { Component } from 'react';
import PropType from 'prop-types';
import { Button } from 'react-bootstrap';
import axios from '../utils/axios';

class WriteMessage extends Component {
	state = {
		msg: '',
		showSent: false
	};

	static propTypes = {
		username: PropType.string.isRequired
	};

	sentTimeout = null;

	handleMsgChange = val => {
		this.setState({ msg: val, showSent: false });
		if (this.sentTimeout) clearTimeout(this.sentTimeout);
	};

	sendMessage = () => {
		axios()
			.post('/user/send', {
				id: this.props.username,
				message: this.state.msg
			})
			.then(res => {
				this.setState({ msg: '', showSent: true });
				this.sentTimeout = setTimeout(
					() => this.setState({ showSent: false }),
					3000
				);
			});
	};

	componentWillUnmount = () =>
		this.sentTimeout ? clearTimeout(this.sentTimeout) : null;

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
				<p
					className="text-success"
					style={{
						fontSize: '0.8em',
						visibility: this.state.showSent ? 'visible' : 'hidden'
					}}
				>
					Thank you for sending the message!
				</p>
			</div>
		);
	}
}

export default WriteMessage;
