/*
 * This is wrapper for axios for our app
 * This configures axios for making our ajax requests
 * It sets the base url of out API endpoint
 * and, sets auth header when it changes
 *
 * Usage:
 * import axios from 'path/to/this/file/axios.js';
 *
 * axios().post(...);
 * axios().get(...);
 * ...
 *
 * Note the `()` after `axios`
 */

import ax from 'axios';

let axios = ax;

export const baseurl =
	process.env.NODE_ENV === 'production'
		? 'https://abierto.herokuapp.com'
		: 'http://localhost:3000';

// Options for axios
const options = {
	baseURL: `${baseurl}/api/v1/`,
	headers: {
		Authorization: null
	}
};

axios = ax.create(options);

// Changing auth header
// Immediately configure axios for next request
export const setAuthToken = token => {
	options.headers.Authorization = token;
	axios = ax.create(options);
};

// Get auth header
export const getAuthToken = () => options.headers.Authorization;

export default () => Object.freeze(axios);
