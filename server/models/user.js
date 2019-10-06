import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	uid: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	about: {
		type: String,
		required: true
	},
	messages: {
		type: Array
	}
});

export default mongoose.model('users', userSchema);
