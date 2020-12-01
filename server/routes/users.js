import express from 'express';
import { User, validateUser } from '../models/user';
import bcrypt from 'bcrypt';
import * as _ from 'lodash';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
});

//REGISTER USER
router.post('/', async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registerd');

	user = new User(
		_.pick(req.body, ['username', 'email', 'password', 'isAdmin'])
	);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token)
		.header('access-control-expose-headers', 'x-auth-token')
		.send(_.pick(user, ['_id', 'username', 'email']));

	res.send(_.pick(user, ['_id', 'username', 'email', 'rank']));
});

export default router;
