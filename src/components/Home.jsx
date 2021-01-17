import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getPosts, updatePost } from '../services/postService';
import Header from './Header';

export default function Home() {
	const [posts, setPosts] = useState([]);

	const fetchData = async () => {
		const { data: posts } = await getPosts();
		const sortedPosts = posts.sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);
		setPosts([...sortedPosts]);
	};

	const handleUpdatePost = async (data, postId) => {
		const { newTitle, newImgFile, newPdfDoc, newDescription } = data;

		const fd = new FormData();
		fd.append('title', newTitle);
		fd.append('thumbnailImg', newImgFile, newImgFile.name);
		fd.append('pdfDoc', newPdfDoc, newPdfDoc.name);
		fd.append('description', newDescription);

		try {
			const res = await updatePost(postId, fd);
			console.log(res);
		} catch (error) {
			console.log(error);
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
			{posts.length > 0 ? (
				posts.map((post) => (
					<Card
						key={post._id}
						author={post.author}
						title={post.title}
						img={post.thumbnailImgPath.replace(/\\/g, '/')}
						pdf={post.pdfDocPath.replace(/\\/g, '/')}
						description={post.description}
						onClickUpdate={(childData) =>
							handleUpdatePost(childData, post._id)
						}
						onClickRead={(childData) =>
							handleReadPost(childData, post._id)
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
	);
}
