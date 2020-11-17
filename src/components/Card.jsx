import React, { useState } from 'react';
import Button from './Button';

export default function Card({
	title,
	img,
	pdf,
	description,
	onClickUpdate,
	onClickDelete,
	onClickRead,
}) {
	const [modifyMod, setModifyMod] = useState(false);

	return (
		<div className="card">
			<h2 className="post-header">{title}</h2>
			{img && (
				<img
					className="thumbnail"
					src={`http://localhost:5000/${img}`}
					alt="Post thumbnail"
				/>
			)}
			<div>
				<span>{pdf}</span>
			</div>
			<div className="post-body">
				<p className="text">{description}</p>
			</div>
			{modifyMod && (
				<form className="modify-section">
					<input type="text" placeholder="New Title" />
					<input type="file" accept="image/*" />
					<input type="file" accept="application/pdf" />
					<input type="text" placeholder="New Description" />
					<Button
						icon="fas fa-cloud-upload-alt"
						onClick={onClickUpdate}
					/>
				</form>
			)}
			<div className="btn-section">
				<button
					className="modify"
					onClick={() => setModifyMod(!modifyMod)}>
					Modify
				</button>
				<button className="delete" onClick={onClickDelete}>
					Delete
				</button>
				<button className="read-more" onClick={onClickRead}>
					Read More
				</button>
			</div>
		</div>
	);
}
