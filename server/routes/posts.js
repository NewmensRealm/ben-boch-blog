import express from 'express';
import fs from 'fs';
import { Post, validatePost, validateUpdatedPost } from '../models/post';
import { User } from '../models/user';
import multer from 'multer';
import auth from '../middleware/auth';
import * as _ from 'lodash';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		const now = new Date().toISOString();
		const date = now.replace(/:/g, '-');
		cb(null, date + file.originalname);
	},
});

const uploads = multer({ storage: storage });

const router = express.Router();

router.get('/', async (req, res) => {
	const posts = await Post.find().sort('title');
	res.send(posts);
});

router.get('/:id', async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) return res.status(400).send('Post not found');
	res.send(post).status(200);
});

router.post(
	'/',
	auth,
	uploads.fields([
		{ name: 'thumbnailImg', maxCount: 1 },
		{ name: 'pdfDoc', maxCount: 1 },
	]),
	async (req, res) => {
		console.log(req.body);
		const { error } = validatePost(req.body);
		console.log(error);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findById(req.body.userId);
		if (!user) return res.status(400).send('Invalid user...');

		const post = new Post({
			author: {
				_id: user._id,
				username: user.username,
			},
			title: req.body.title,
			thumbnailImgPath: req.files['thumbnailImg'][0].path,
			pdfDocPath: req.files['pdfDoc'][0].path,
			description: req.body.description,
		});

		await post.save();

		const updatedUser = await User.findByIdAndUpdate(user._id, {
			$inc: { numOfPosts: 1 },
		});

		res.send({ post, updatedUser }).status(200);
	}
);

router.put(
	'/:id',
	auth,
	uploads.fields([
		{ name: 'thumbnailImg', maxCount: 1 },
		{ name: 'pdfDoc', maxCount: 1 },
	]),
	async (req, res) => {
		const { error } = validateUpdatedPost(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const post = await Post.findById(req.params.id);
		if (!post) return res.status(400).send('Invalid post...');

		const onlyUpdate = _.pickBy(req.body, _.identity);

		if (req.files['thumbnailImg']) {
			onlyUpdate['thumbnailImgPath'] = req.files['thumbnailImg'][0].path;
			fs.unlinkSync(post.thumbnailImgPath);
		}
		if (req.files['pdfDoc']) {
			onlyUpdate['pdfDocPath'] = req.files['pdfDoc'][0].path;
			fs.unlinkSync(post.pdfDocPath);
		}

		const updatedPost = await Post.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					...onlyUpdate,
					date: Date.now(),
				},
			},
			{ new: true }
		);

		if (!updatedPost) return res.status(400).send('Invalid input...');

		res.send(updatedPost).status(200);
	}
);

router.delete('/:id', auth, async (req, res) => {
	console.log(req.params.id);
	const post = await Post.findById(req.params.id);
	console.log(post);
	if (!post) return res.status(400).send('Post does not exists...');
	try {
		fs.unlinkSync(post.thumbnailImgPath);
		fs.unlinkSync(post.pdfDocPath);
	} catch (err) {
		res.sendStatus(400);
	}
	await Post.findByIdAndDelete(req.params.id);
	await User.findByIdAndUpdate(post.author._id, { $inc: { numOfPosts: -1 } });
	res.send(post).status(200);
});

export default router;
