import React, { useState, useEffect } from 'react';
import Joi from 'joi-browser';
import { publishPost, getPosts } from '../services/postService';
import { logout, getCurrentUser } from '../services/authService';
import Card from './Card';
import Header from './Header';
import UserPropItem from './UserPropItem';
import { Link } from 'react-router-dom';
import PopUp from './PopUp';
import FileInput from './input/FileInput';
import Input from './input/Input';
import InputForm from './input/InputForm';
import PostForm from './PostForm';
import Button from './utils/Button';

export default function Profile() {
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);

	//const [error, setError] = useState({});
	const [user, setUser] = useState(getCurrentUser());
	const [userPosts, setUserPosts] = useState([]);
	const [postData, setPostData] = useState({
		title: '',
		imgFile: '',
		pdfDoc: '',
		description: '',
	});

	const handleLogout = () => {
		logout();
		window.location = '/main';
	};

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
		const { title, imgFile, pdfDoc, description } = postData;
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

	const handlePublisher = async () => {
		const error = validate();
		const { title, imgFile, pdfDoc, description } = postData;

		console.log(error);
		if (error) return null;

		const fd = new FormData();
		fd.append('userId', getCurrentUser()._id);
		fd.append('title', title);
		fd.append('thumbnailImg', imgFile, imgFile.name);
		fd.append('pdfDoc', pdfDoc, pdfDoc.name);
		fd.append('description', description);

		try {
			const res = await publishPost(fd);
			console.log(res);
			if (res.status === 200) {
				setIsPopUpOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchData = async () => {
		const { data: posts } = await getPosts();
		const userPosts = posts.filter((post) => post.author._id === user._id);
		setUserPosts([...userPosts]);
	};

	useEffect(() => {
		fetchData();
	}, [isPopUpOpen]);

	return (
		<div className="profile-container">
			<PopUp isOpen={isPopUpOpen}>
				<PostForm>
					<InputForm>
						<Input
							type="text"
							placeholder="Title"
							onChange={(event) =>
								setPostData({
									...postData,
									title: event.target.value,
								})
							}
						/>
						<img
							className="thumbnail"
							src="../assets/images/placeholder.png"
							alt="New post thumbnail"
						/>
						<FileInput
							type="file"
							name="imgFile"
							placeholder="Select image"
							accept=".jpeg, .jpg, .png"
							onChange={(event) =>
								setPostData({
									...postData,
									imgFile: event.target.files[0],
								})
							}
						/>
						<FileInput
							type="file"
							name="pdfDoc"
							placeholder="Select document"
							accept="application/pdf"
							onChange={(event) =>
								setPostData({
									...postData,
									pdfDoc: event.target.files[0],
								})
							}
						/>
						<Input
							type="text"
							placeholder="Description"
							onChange={(event) =>
								setPostData({
									...postData,
									description: event.target.value,
								})
							}
						/>
					</InputForm>
					<div>
						<Button
							title="Cancel"
							onClick={() => setIsPopUpOpen(false)}
						/>
						<Button title="Publish" onClick={handlePublisher} />
					</div>
				</PostForm>
			</PopUp>

			<div className="profile-bar">
				<Header title={<strong>{user.username}</strong>} />
				<div className="profile-img">
					<i className="far fa-user-circle fa-6x"></i>
				</div>
				<div className="user-props">
					<UserPropItem
						label="Number of Posts"
						value={user.numOfPosts}
					/>
					<UserPropItem label="Rank" value={user.rank} />
					<UserPropItem
						label="Clan"
						value={
							user.clan === 'none' ? (
								<Button title="Creat a Clan" />
							) : (
								user.clan
							)
						}
					/>
					<Button title="LogOut" onClick={handleLogout} />
				</div>
				<div className="poly-footer">
					<Link to="/main">
						<i className="fab fa-accusoft fa-10x footer-icon"></i>
					</Link>
				</div>
			</div>
			<div className="user-posts">
				<Button title="Add Post" onClick={() => setIsPopUpOpen(true)} />

				{userPosts.map((post) => (
					<Card
						key={post._id}
						author={post.author.username}
						title={post.title}
						img={post.thumbnailImgPath}
						pdf={post.pdfDocPath}
						description={post.description}
						/*
				onClickUpdate={(childData) =>
					handleUpdatePost(childData, post._id)
				}
				onClickDelete={() => handleDelete(post._id)}
				onClickRead={(childData) =>
					handleReadPost(childData, post._id)
				}*/
					/>
				))}
			</div>
		</div>
	);
}
