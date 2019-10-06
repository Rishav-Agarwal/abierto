import React, { Component } from 'react';
import Profile from './Profile';
import WriteMessage from './WriteMessage';

class User extends Component {
	render() {
		return (
			<div className="m-auto col-12 col-sm-9 col-md-8 col-lg-6">
				<Profile username={this.props.match.params.id} />
				<WriteMessage username={this.props.match.params.id} />
			</div>
		);
	}
}

export default User;
