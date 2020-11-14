import express from 'express';
import { Post, validatePost } from '../models/post';
import { User } from '../models/user';

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

router.post('/', async (req, res) => {
	const { error } = validatePost(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findById(req.body.userId);
	if (!user) return res.status(400).send('Invalid user...');

	const post = new Post({
		author: {
			_id: user._id,
			name: user.name,
			rank: user.rank,
		},
		title: req.body.title,
		thumbnailImagePath: req.body.thumbnailImage,
		pdfPath: req.body.pdfPath,
		description: req.body.description,
		//date: Date.now,
	});

	await post.save();

	res.send(post);
});

router.put('/:id', async (req, res) => {
	const { error } = validatePost(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findById(req.body.userId);
	if (!user) return res.status(400).send('Invalid user...');

	const post = await Post.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				author: {
					_id: user._id,
					name: user.name,
					email: user.email,
					rank: user.rank,
				},
				thumbnailImagePath: req.body.thumbnailImage,
				pdfPath: req.body.pdfPath,
				description: req.body.description,
				date: Date.now,
			},
		},
		{ new: true }
	);

	if (!post) return res.status(400).send('Invalid input...');

	res.send(post);
});

router.delete('/:id', async (req, res) => {
	const post = await Post.findByIdAndRemove(req.params.id);
	if (!post) return res.status(400).send('Post does not exists...');
	res.send(post);
});

export default router;
