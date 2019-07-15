import React, { Component } from 'react';

import Profile from './Profile';
import ListMessages from './ListMessages';

/* Show messages recieved by the user */
class Messages extends Component {
	render() {
		return (
			/*
			 *  Return sample data
			 *  TODO: Fetch messages of the user and display
			 */
			<>
				<Profile />
				<ListMessages />
			</>
		);
	}
}

export default Messages;
