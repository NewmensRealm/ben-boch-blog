import React from 'react';

export default function Card({ title, text, img }) {
	return (
		<div className="card">
			<h2 className="post-header">{title}</h2>
			<img className="thumbnail" src={img} alt="Post thumbnail" />
			<div className="post-body">
				<p className="text">{text}</p>
			</div>
			<div className="btn-section">
				<button className="read-more">Read More</button>
			</div>
		</div>
	);
}
