import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import userRoute from './routes/user';

// Configure environment variables for server
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	/*
	 * Redirect user to https if requested on http
	 *
	 * Refer this for explaination:
	 * https://www.tonyerwin.com/2014/09/redirecting-http-to-https-with-nodejs.html
	 */
	app.enable('trust proxy');
	app.use((req, res, next) => {
		// console.log('secure check');
		if (req.secure) {
			// console.log('secure');
			// request was via https, so do no special handling
			next();
		} else {
			//
			// request was via http, so redirect to https
			res.redirect(`https://${req.headers.host}${req.url}`);
		}
	});
	// Set static folder
	app.use(express.static(path.join(__dirname, '../../client/build/')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../../client/build/index.html'));
	});
}

const baseUrl = '/api/v1';

// Body parser middleware for json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
	useNewUrlParser: true,
	useFindAndModify: false
});

app.use(`${baseUrl}/user`, userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
