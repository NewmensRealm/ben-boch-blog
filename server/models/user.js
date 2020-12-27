import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
	username: {
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
	numOfPosts: { type: Number, required: true, default: 0 },
	clan: {
		type: String,
		required: true,
		default: 'none',
		minlength: 3,
		maxlength: 50,
		trim: true,
	},
	profilePhotoPath: { type: String, required: true, default: 'none' },
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			username: this.username,
			isAdmin: this.isAdmin,
			rank: this.rank,
			numOfPosts: this.numOfPosts,
			clan: this.clan,
			profilePicturePath: this.profilePhotoPath,
		},
		process.env.ACCESS_TOKEN_SECRET
	);
};

export const User = mongoose.model('User', userSchema);

export function validateUser(user) {
	const schema = Joi.object({
		username: Joi.string().trim().min(3).max(10).required(),
		email: Joi.string().min(6).max(50).required().email(),
		password: Joi.string().required().min(6).max(1024),
		rank: Joi.string(),
		isAdmin: Joi.boolean(),
		numOfPosts: Joi.number().max(1024),
		clan: Joi.string().min(3).max(50),
		profilePhotoPath: Joi.string(),
	});

	return schema.validate(user);
}

//export default { User, userSchema, validateUser };
