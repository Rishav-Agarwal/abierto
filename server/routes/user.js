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
	User.findOne(user, (err, result) => {
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
	console.log(req);
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

export default app;
