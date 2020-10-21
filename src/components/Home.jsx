import React, { useState, useEffect } from "react";
import Card from "./Card";

const postList = [
	{
		id: 1,
		title: "Text about nothing!",
		img: "https://picsum.photos/200/300",
		text:
			"A text portion A text portionA text portioA text portioA text portiA text portioA text poA text portioA text portioA text portioA text portioA text portioA text portioA text portiortioA text portioA text portioA text portioA text portiooA text portioA text portioA text portioA text portioA text portioA text portio",
	},
	{
		id: 2,
		title: "Another Post",
		img: "https://picsum.photos/200/300",
		text: "A text portion",
	},

	{
		id: 3,
		title: "New Post",
		img: "https://picsum.photos/200/300",
		text: "A text portion",
	},
];

export default function Home() {
	const [posts, setPosts] = useState(postList);

	useEffect(() => {
		setPosts((prevPosts) => postList);
	}, [posts]);

	return (
		<div className='home'>
			{posts.map((post) => (
				<Card
					key={post.id}
					title={post.title}
					img={post.img}
					text={post.text}
				/>
			))}
		</div>
	);
}
