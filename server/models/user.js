import mongoose from 'mongoose';
import Joi from 'joi';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 30,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 6,
		maxlength: 50,
	},
	rank: { type: String, required: true, default: 'Novice' },
	password: { type: String, required: true, minlength: 6, maxlength: 1024 },
	isAdmin: Boolean,
});

export const User = mongoose.model('User', userSchema);

export function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().trim().min(3).max(30).required(),
		email: Joi.string().min(6).max(50).required().email(),
		password: Joi.string().required().min(6).max(1024),
		rank: Joi.string(),
		isAdmin: Joi.boolean(),
	});

	return schema.validate(user);
}

//export default { User, userSchema, validateUser };
