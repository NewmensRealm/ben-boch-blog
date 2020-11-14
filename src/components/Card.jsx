import React from 'react';

export default function Card({ title, description, img }) {
	return (
		<div className="card">
			<h2 className="post-header">{title}</h2>
			{img && (
				<img className="thumbnail" src={img} alt="Post thumbnail" />
			)}
			<div className="post-body">
				<p className="text">{description}</p>
			</div>
			<div className="btn-section">
				<button className="read-more">Read More</button>
			</div>
		</div>
	);
}
