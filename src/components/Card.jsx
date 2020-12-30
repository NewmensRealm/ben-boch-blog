import React, { useState } from 'react';
import Joi from 'joi-browser';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import Button from './utils/Button';
import EditButton from './utils/EditButton';

export default function Card({
	author,
	title,
	img,
	pdf,
	description,
	onClickUpdate,
	onClickDelete,
	onClickRead,
}) {
	const [newTitle, setNewTitle] = useState('');
	const [newImgFile, setNewImgFile] = useState('');
	const [newPdfDoc, setNewPdfDoc] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const { id: urlUserId } = useParams();

	const data = {
		newTitle,
		newImgFile,
		newPdfDoc,
		newDescription,
	};

	const schema = {
		newTitle: Joi.string().trim().min(3).max(50).label('Title').allow(''),
		newImgFile: Joi.object().label('Thumbnail Image').allow(''),
		newPdfDoc: Joi.object().label('PDF').allow(''),
		newDescription: Joi.string()
			.trim()
			.min(10)
			.max(255)
			.label('Description')
			.empty(''),
	};

	const validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(data, schema, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};

	const updatePost = () => {
		const result = validate();
		console.log(result);
		if (result) return null;
		onClickUpdate(data);
	};

	const readPost = () => {
		onClickRead('read');
	};

	return (
		<div className="card-container">
			<div className="card">
				<div className="post-header-section">
					<h2 className="post-header">{title}</h2>
					<Link
						to={`/profile/${author._id}`}
						style={{ textDecoration: 'none' }}>
						<span className="user-link">
							`by <strong>{author.username} </strong>`
						</span>
					</Link>
				</div>
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
				<div className="btn-section">
					{getCurrentUser() && getCurrentUser()._id === urlUserId ? (
						<div>
							<button className="delete" onClick={onClickDelete}>
								Delete
							</button>
						</div>
					) : null}
					<button className="read-more" onClick={readPost}>
						Read More
					</button>
				</div>
			</div>
			{getCurrentUser() && getCurrentUser()._id === urlUserId ? (
				<div className="edit-bar">
					<EditButton
						icon="fas fa-heading"
						placeholder="New title"
						onChange={(event) => setNewTitle(event.target.value)}
					/>
					<EditButton
						icon="far fa-image"
						fileInput
						accept=".jpg, .jpeg, .png"
						onChange={(event) =>
							setNewImgFile(event.target.files[0])
						}
					/>
					<EditButton
						icon="far fa-file-pdf"
						fileInput
						accept="application/pdf"
						onChange={(event) =>
							setNewPdfDoc(event.target.files[0])
						}
					/>
					<EditButton
						icon="fas fa-align-left"
						placeholder="New description"
						onChange={(event) =>
							setNewDescription(event.target.value)
						}
					/>
					<Button icon="far fa-paper-plane" onClick={updatePost} />
				</div>
			) : null}
		</div>
	);
}
