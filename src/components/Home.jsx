import React from 'react';
import Card from './Card';

export default function Home() {
	return (
		<div className="home">
			<Card
				title="Post1"
				img="https://picsum.photos/200/300"
				text="A text portion"
			/>
			<Card
				title="Post2"
				img="https://picsum.photos/200/300"
				text="A text portion"
			/>
			<Card
				title="Post3"
				img="https://picsum.photos/200/300"
				text="A text portion"
			/>
		</div>
	);
}
