import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/* A private routing component to redirect a user to login page if
protected pages are accessed by Url or any mean */
function PrivateRoute({
	component: Component1,
	isLoggedIn: isLoggedIn1,
	componentProps,
	...rest
}) {
	PrivateRoute.propTypes = {
		component: PropTypes.func.isRequired,
		componentProps: PropTypes.instanceOf(Object),
		isLoggedIn: PropTypes.bool.isRequired
	};

	PrivateRoute.defaultProps = {
		componentProps: {}
	};

	return (
		<Route
			{...rest}
			render={props =>
				isLoggedIn1 ? (
					<Component1 {...props} {...componentProps} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;
