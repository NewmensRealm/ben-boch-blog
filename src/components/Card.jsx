import React, { useState, useRef } from 'react';
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
	const newTitleRef = useRef();
	const newImgRef = useRef();
	const newPdfRef = useRef();
	const newDescriptionRef = useRef();

	const updatePost = () => {
		onClickUpdate({
			newTitle: newTitleRef.current.value,
			newImg: newImgRef.current.files[0],
			newPdf: newPdfRef.current.files[0],
			newDescription: newDescriptionRef.current.value,
		});
	};

	const readPost = () => {
		onClickRead('read');
	};

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
				<div className="modify-section">
					<input
						ref={newTitleRef}
						type="text"
						placeholder="New Title"
					/>
					<input ref={newImgRef} type="file" accept="image/*" />
					<input
						ref={newPdfRef}
						type="file"
						accept="application/pdf"
					/>
					<input
						ref={newDescriptionRef}
						type="text"
						placeholder="New Description"
					/>
					<Button
						icon="fas fa-cloud-upload-alt"
						onClick={updatePost}
					/>
				</div>
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
				<button className="read-more" onClick={readPost}>
					Read More
				</button>
			</div>
		</div>
	);
}
