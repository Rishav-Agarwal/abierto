import express from 'express';
import hash from 'object-hash';
import verifyUser from '../utils/VerifyUser';

import User from '../models/user';

const app = express.Router();

/*
 * Authenticate the user.
 * After authentication, it makes the user data from Google available
 * through the `user` field in the request object. [`req.user`]
 */
const auth = (req, res, next) => {
	// Get the auth token of the user which sent the request
	const idToken = req.header('Authorization');
	// Verify the user and then continue further steps
	verifyUser(idToken)
		.then(user => {
			// Set user data in `user` field of `user` object
			req.user = user;
			next();
		})
		.catch(err => {
			const code = err.code || 500;
			const reason = err.reason || 'Internal server error';
			res.status(code).json({ reason });
		});
};

/*
 * @desc: Check if requested user exists or not. If exists, return the user data.
 * @route: GET /user/check
 * @return: User data if exists
 */
app.get('/check/:id', (req, res) => {
	// Get the user
	User.findOne(
		{ id: req.params.id },
		'-messages -email -uid -__v',
		(err, result) => {
			if (err) {
				res.status(500).json({ reason: 'Internal error', err });
				return;
			}

			// Is user fetched successfully, return its data
			res.json(result);
		}
	);
});

/*
 * @desc: Create a user.
 *  First, verify the integrity of token recieved and match the client id
 *  Then, check if user already exists. If exists, return user data.
 *  If user doesn't exists, create one and return user's data.
 * @route: POST /user/create
 * @return: The user data
 */
app.post('/create', auth, (req, res) => {
	const user = req.user;

	// Find if user exists in database
	User.findOne({ uid: user.uid }, (err, result) => {
		if (err) {
			res.status(500).json({ reason: 'Internal error' });
			return;
		}

		// If user doesn't exist, create one. Else, return data
		if (result === null) {
			// User doesn't exist, create one
			const newUser = new User(req.user);
			newUser.id = user.name.replace(/ /g, '_') + '_' + hash(user);
			newUser.about = 'I am too lazy to change the default text!';
			newUser.messages = [];
			// Save thenew user to the database
			newUser.save().then((res, err) => {
				if (err) {
					res.status(500).json({ reason: 'Internal error' });
					return;
				}

				// Return data if succesful
				res.status(200).json(user);
			});
		} else {
			// User already exists, just return the data
			res.status(200).json(result);
		}
	});
});

/*
 * @desc: Get the messages sent to the user
 * @route: GET /user/messages
 * @return: The list of mesages sent to the user
 */
app.get('/messages', auth, (req, res) => {
	User.findOne({ uid: req.user.uid }, 'messages -_id')
		.then(userMessages => {
			res
				.status(200)
				.json(userMessages.messages != null ? userMessages : { messages: [] });
		})
		.catch(err => {
			res.status(500).json({ reason: 'Internal error! ' + err });
		});
});

/*
 * @desc: Send the message to the specified user
 * @route: POST /user/send
 * @body-params: _id  The id of the user to whom the message is to be sent
 *               message  The message to send
 */
app.post('/send', (req, res) => {
	User.findOneAndUpdate(
		{ id: req.body.id },
		{
			$push: { messages: { message: req.body.message, timestamp: Date.now() } }
		},
		{ upsert: true }
	)
		.then(ress => res.status(200).json({ result: ress }))
		.catch(err => res.status(500).json({ reason: 'Internal error! ' + err }));
});

/*
 * @desc: Update the user data
 * @route: PUT /user/update
 * @body-params: name       Name of the user
 *               username   Username(id) of the user
 *               about      About the user
 */
app.put('/update', auth, (req, res) => {
	let { name, username, about } = req.body;
	let valid = true,
		nameError = '',
		usernameError = '';

	// Validate name- Length
	if (name.length !== 0 && (name.length < 2 || name.length > 100)) {
		nameError = 'Name length should be atleast 2 and maximmum 100';
		valid = false;
	}

	// Validate username- Length, Pattern
	username = username.trim();
	// Check pattern
	if (username.length !== 0 && !/^[a-zA-Z0-9_]+$/.test(username)) {
		usernameError =
			'Username can contain only alphaumeric characters and underscore(_)';
		valid = false;
	}
	// Check length
	if (username.length !== 0 && (username.length < 2 || username.length > 20)) {
		usernameError = 'Username length should be atleast 2 and maximum 20';
		valid = false;
	}

	// If basic requirements are not met, return error
	if (!valid) {
		res.status(400).json({ nameError, usernameError });
		return;
	}

	User.findOne({ id: username })
		.then(user => {
			if (user) {
				// Username is taken
				res.status(400).json({ usernameError: 'Username already exists' });
				return;
			}

			// Update only the fields requested
			let toUpdate = {};
			if (name.length) toUpdate.name = name;
			if (username.length) toUpdate.id = username;
			if (about.length) toUpdate.about = about;

			// Update
			return User.findOneAndUpdate({ uid: req.user.uid }, toUpdate);
		})
		.then(updateRes => {
			console.log(updateRes);
			if (updateRes) res.status(200).send('Successful');
		})
		.catch(err => res.status(500).json({ message: 'Internal error ' + err }));
});

export default app;
