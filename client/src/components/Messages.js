import React, { Component } from 'react';

import Profile from './Profile';
import ListMessages from './ListMessages';

/* Show messages recieved by the user */
class Messages extends Component {
	render() {
		return (
			/*
			 *  Display messages received by the user
			 */
			<div className="d-flex flex-column">
				<Profile username="self" />
				<ListMessages />
			</div>
		);
	}
}

export default Messages;
