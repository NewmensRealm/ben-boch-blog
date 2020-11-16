import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getPosts, deletePost } from '../services/postService';

export default function Home() {
	const [posts, setPosts] = useState([]);

	const fetchData = async () => {
		const { data: posts } = await getPosts();

		setPosts([...posts]);
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

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="home">
			{posts.map((post) => (
				<Card
					key={post._id}
					title={post.title}
					description={post.description}
					onClickDelete={() => handleDelete(post._id)}
				/>
			))}
		</div>
	);
}
