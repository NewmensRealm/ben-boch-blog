import mongoose from 'mongoose';
import Joi from 'joi-oid';

const Schema = mongoose.Schema;

export const postSchema = new Schema({
	author: {
		type: new Schema({
			name: { type: String, required: true },
			rank: { type: String, required: true },
		}),
		required: true,
	},
	title: {
		type: String,
		trim: true,
		minlength: 5,
		maxlength: 50,
		require: true,
	},
	thumbnailImgPath: String,
	pdfPath: { type: String },
	description: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 255,
	},
	date: { type: Date, requred: true, default: Date.now },
});

export const Post = mongoose.model('Post', postSchema);

export function validatePost(post) {
	const schema = Joi.object({
		userId: Joi.objectId().required(),
		title: Joi.string().required().min(5).max(50),
		thumbnailImgPath: Joi.string(),
		pdfPath: Joi.string(),
		description: Joi.string().required().min(10).max(255),
		date: Joi.date(),
	});
	return schema.validate(post);
}
