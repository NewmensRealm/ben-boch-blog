import express from 'express';
import fs from 'fs';
import { Post, validatePost, validateUpdatedPost } from '../models/post';
import { User } from '../models/user';
import multer from 'multer';
import auth from '../middleware/auth';

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
	res.send(post);
});

router.post(
	'/',
	auth,
	uploads.fields([
		{ name: 'thumbnailImg', maxCount: 1 },
		{ name: 'pdfDoc', maxCount: 1 },
	]),
	async (req, res) => {
		const { error } = validatePost(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findById(req.body.userId);
		if (!user) return res.status(400).send('Invalid user...');

		const post = new Post({
			author: {
				_id: user._id,
				username: user.username,
				rank: user.rank,
			},
			title: req.body.title,
			thumbnailImgPath: req.files['thumbnailImg'][0].path,
			pdfDocPath: req.files['pdfDoc'][0].path,
			description: req.body.description,
			//date: Date.now,
		});

		await post.save();
		res.send(post);
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

		fs.unlinkSync(post.thumbnailImgPath);
		fs.unlinkSync(post.pdfDocPath);

		const updatedPost = await Post.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					title: req.body.title,
					thumbnailImgPath: req.files['thumbnailImg'][0].path,
					pdfDocPath: req.files['pdfDoc'][0].path,
					description: req.body.description,
					//date: Date.now,
				},
			},
			{ new: true }
		);

		if (!updatedPost) return res.status(400).send('Invalid input...');

		res.send(updatedPost);
	}
);

router.delete('/:id', auth, async (req, res) => {
	//const post = await Post.findByIdAndRemove(req.params.id);
	const post = await Post.findById(req.params.id);
	if (!post) return res.status(400).send('Post does not exists...');
	try {
		fs.unlinkSync(post.thumbnailImgPath);
		fs.unlinkSync(post.pdfDocPath);

		console.log('successfully deleted resources');
	} catch (err) {
		console.log('Error occured');
	}
	await Post.findByIdAndDelete(req.params.id);
	res.send(post);
});

export default router;
