import React, { useState } from 'react';
import Joi from 'joi-browser';
import FancyInput from './input/FancyInput';
import Button from './utils/Button';
import { publishPost } from '../services/postService';
import { logout, getCurrentUser } from '../services/authService';

export default function Profile() {
	const [title, setTitle] = useState('');
	const [imgFile, setImgFile] = useState('');
	const [pdfDoc, setPdfDoc] = useState('');
	const [description, setDescription] = useState('');
	//const [error, setError] = useState({});
	const [user, setUser] = useState(getCurrentUser());

	const schema = {
		title: Joi.string().trim().min(5).max(50).required().label('Title'),
		imgFile: Joi.object().required().label('Thumbnail Image'),
		pdfDoc: Joi.object().required().label('PDF'),
		description: Joi.string()
			.trim()
			.min(10)
			.max(255)
			.required()
			.label('Description'),
	};

	const validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(
			{ title, imgFile, pdfDoc, description },
			schema,
			options
		);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};

	const handleLogout = () => {
		logout();
		window.location = '/main';
	};
	const handlePublisher = async () => {
		const result = validate();
		console.log(result);
		if (result) return null;

		const fd = new FormData();
		fd.append('userId', getCurrentUser()._id);
		fd.append('title', title);
		fd.append('thumbnailImg', imgFile, imgFile.name);
		fd.append('pdfDoc', pdfDoc, pdfDoc.name);
		fd.append('description', description);

		try {
			await publishPost(fd);
			window.location = '/main';
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="profile-container">
			<div className="profile">
				<h1>{user.username}</h1>
				<div className="profile-img"></div>
			</div>
			<div className="stats">
				<div className="stats-item">
					<span className="item-title">-Uploads-</span>
					<span>{user.numOfPosts}</span>
				</div>
				<div className="stats-item">
					<span className="item-title">-Rank-</span>
					<span>{user.rank}</span>
				</div>
				<div className="stats-item">
					<span className="item-title">-Clan-</span>
					<span>{user.clan}</span>
				</div>
			</div>
			<Button icon="fas fa-sign-out-alt" onClick={handleLogout} />
			<div className="post-form">
				<div className="form">
					<h1 className="login-header">Post</h1>
					<form>
						<FancyInput
							type="text"
							placeholder="Title"
							name="title"
							onChange={(event) => setTitle(event.target.value)}
						/>
						<FancyInput
							type="file"
							placeholder="Select thumbnail"
							name="thumbnailImg"
							accept="image/*"
							icon="fas fa-file-image"
							onChange={(event) =>
								setImgFile(event.target.files[0])
							}
						/>
						<FancyInput
							type="file"
							name="pdfDoc"
							placeholder="Select document"
							accept="application/pdf"
							icon="fas fa-file-pdf"
							onChange={(event) =>
								setPdfDoc(event.target.files[0])
							}
						/>
						<FancyInput
							type="text"
							placeholder="Description"
							name="description"
							onChange={(event) =>
								setDescription(event.target.value)
							}
						/>
					</form>
					<Button title="Publish" onClick={handlePublisher} />
				</div>
			</div>
		</div>
	);
}
