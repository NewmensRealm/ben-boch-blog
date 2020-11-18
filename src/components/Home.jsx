import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getPosts, deletePost, updatePost } from '../services/postService';

export default function Home() {
	const [posts, setPosts] = useState([]);

	const fetchData = async () => {
		const { data: posts } = await getPosts();

		setPosts([...posts]);
	};

	const handleUpdatePost = async (data, postId) => {
		const {newTitle, newImg, newPdf, newDescription}=data
		
		const fd = new FormData();
		fd.append('title', newTitle);
		fd.append('thumbnailImg', newImg, newImg.name);
		fd.append('pdfDoc', newPdf, newPdf.name);
		fd.append('description', newDescription);

		try {
			const res = await updatePost(postId, fd);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (postId) => {
		const originalPosts = posts;

		const updatedPosts = originalPosts.filter((p) => p._id !== postId);
		setPosts([...updatedPosts]);
		try {
			await deletePost(postId);
		} catch (error) {
			if (error.response && error.response.status === 404)
				console.log('This movie has already been deleted.');
			setPosts([...originalPosts]);
		}
	};

	const handleReadPost = (childData, postId) => {
		console.log(childData, postId);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="home">
			{posts.map((post) => (
				<Card
					key={post._id}
					title={post.title}
					img={post.thumbnailImgPath}
					pdf={post.pdfDocPath}
					description={post.description}
					onClickUpdate={(childData) =>
						handleUpdatePost(childData, post._id)
					}
					onClickDelete={() => handleDelete(post._id)}
					onClickRead={(childData) =>
						handleReadPost(childData, post._id)
					}
				/>
			))}
		</div>
	);
}
