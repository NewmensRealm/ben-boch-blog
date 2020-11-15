import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getPosts } from '../services/postService';

export default function Home() {
	const [posts, setPosts] = useState([]);

	const fetchData = async () => {
		const { data: posts } = await getPosts();
		console.log(posts);

		setPosts((prevPosts) => posts);
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
				/>
			))}
		</div>
	);
}
