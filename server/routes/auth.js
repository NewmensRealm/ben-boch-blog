import express from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import Joi from 'joi';
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password');

	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword)
		return res.status(400).send('Invalid email or password');

	const token = user.generateAuthToken();
	res.send(token);
});

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().email().min(6).max(30).required(),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate(req);
}

export default router;
