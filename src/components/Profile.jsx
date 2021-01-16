import React, { useState, useEffect } from 'react';
import {
	publishPost,
	getPosts,
	deletePost,
	updatePost,
} from '../services/postService';
import { logout, getCurrentUser } from '../services/authService';
import { getUser } from '../services/userService';
import Card from './Card';
import Header from './Header';
import UserPropItem from './UserPropItem';
import { Link, useParams, useHistory } from 'react-router-dom';
import Modal from './Modal';
import Button from './utils/Button';
import PostForm from './forms/PostForm';

export default function Profile(props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [resStatus, setResStatus] = useState(false);
	const [user, setUser] = useState({});
	const [userPosts, setUserPosts] = useState([]);

	const { id: urlUserId } = useParams();
	const history = useHistory();

	const handleLogout = () => {
		logout();
		history.push('/main');
	};

	const handlePublisher = async (postData) => {
		const { title, imgFile, pdfDoc, description } = postData;

		const fd = new FormData();
		fd.append('userId', getCurrentUser()._id);
		fd.append('title', title);
		fd.append('thumbnailImg', imgFile, imgFile.name);
		fd.append('pdfDoc', pdfDoc, pdfDoc.name);
		fd.append('description', description);

		try {
			const res = await publishPost(fd);
			if (res.status === 200) {
				setIsModalOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (postId) => {
		const originalPosts = userPosts;

		const updatedPosts = originalPosts.filter((p) => p._id !== postId);
		setUserPosts((prevPosts) => updatedPosts);
		try {
			await deletePost(postId);
		} catch (error) {
			if (error.response && error.response.status === 404)
				console.log('This post has already been deleted.');
			setUserPosts((prevPosts) => originalPosts);
		}
		const numOfPosts = user.numOfPosts - 1;
		setUser((prevUser) => ({ ...user, numOfPosts }));
	};

	const fetchData = async () => {
		const { data: posts } = await getPosts();
		const userPosts = posts.filter((post) => post.author._id === urlUserId);
		const sortedUserPosts = userPosts.sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);

		setUserPosts([...sortedUserPosts]);
	};

	const getUserProfile = async () => {
		const { data: newUser } = await getUser(urlUserId);
		setUser((prevUser) => newUser);
	};

	const handleUpdatePost = async (childData, postId) => {
		const { newTitle, newImgFile, newPdfDoc, newDescription } = childData;
		let isNull = 0;
		for (let item in childData) {
			if (childData[item] === false) isNull++;
		}
		if (isNull === Object.keys(childData).length) return;

		const fd = new FormData();
		fd.append('title', newTitle);
		newImgFile
			? fd.append('thumbnailImg', newImgFile, newImgFile.name)
			: fd.append('thumbnailImg', '');
		newPdfDoc
			? fd.append('pdfDoc', newPdfDoc, newPdfDoc.name)
			: fd.append('pdfDoc', '');
		fd.append('description', newDescription);

		try {
			const res = await updatePost(postId, fd);
			if (res.status === 200) {
				setResStatus(!resStatus);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserProfile();
		fetchData();
	}, [isModalOpen, resStatus]);

	return (
		<div className="profile-container">
			<Modal isOpen={isModalOpen}>
				<PostForm
					cancel={() => setIsModalOpen(false)}
					publish={handlePublisher}
				/>
			</Modal>

			<div className="profile-bar">
				<Header title={<strong>{user.username}</strong>} />
				<div className="profile-img">
					<i className="far fa-user-circle fa-6x"></i>
				</div>
				<div className="user-props">
					<UserPropItem label="Posts" value={user.numOfPosts} />
					<UserPropItem label="Rank" value={user.rank} />
					{getCurrentUser() && getCurrentUser()._id === user._id ? (
						<>
							<UserPropItem
								label="Clan"
								value={
									user.clan === 'none' ? (
										<Button
											title="Creat a Clan"
											onClick={() =>
												console.log(user.numOfPosts - 1)
											}
										/>
									) : (
										user.clan
									)
								}
							/>
						</>
					) : (
						<UserPropItem label="Clan" value={user.clan} />
					)}
				</div>
				{getCurrentUser() && getCurrentUser()._id === user._id && (
					<Button title="LogOut" onClick={handleLogout} />
				)}
				<div className="poly-footer">
					<Link to="/main">
						<i className="fab fa-accusoft fa-10x footer-icon"></i>
					</Link>
				</div>
			</div>

			<div className="user-posts">
				{getCurrentUser() && getCurrentUser()._id === user._id && (
					<Button
						title="Add Post"
						onClick={() => setIsModalOpen(true)}
					/>
				)}

				{userPosts.length > 0 ? (
					userPosts.map((post) => (
						<Card
							key={post._id}
							author={post.author.username}
							title={post.title}
							img={post.thumbnailImgPath}
							pdf={post.pdfDocPath}
							description={post.description}
							onClickDelete={() => handleDelete(post._id)}
							onClickUpdate={(childData) =>
								handleUpdatePost(childData, post._id)
							}
						/>
					))
				) : (
					<Header
						title="There is no posts here"
						styles={{
							color: '#242038',
							fontWeight: 300,
							display: 'flex',
							justifyContent: 'center',
						}}
					/>
				)}
			</div>
		</div>
	);
}
