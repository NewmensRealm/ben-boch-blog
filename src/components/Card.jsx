import React, { useState } from 'react';
import Joi from 'joi-browser';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getFile } from '../services/httpService';
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
}) {
	const [newTitle, setNewTitle] = useState('');
	const [newImgFile, setNewImgFile] = useState('');
	const [newPdfDoc, setNewPdfDoc] = useState('');
	const [newDescription, setNewDescription] = useState('');
	const [errorMsg, setErrorMsg] = useState({
		newTitleError: '',
		newImgError: '',
		newPdfError: '',
		newDescError: '',
	});
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
		if (result) {
			const { newTitle, newImgFile, newPdfDoc, newDescription } = result;
			setErrorMsg({
				newTitleError: newTitle,
				newImgError: newImgFile,
				newPdfError: newPdfDoc,
				newDescError: newDescription,
			});
			return null;
		}
		onClickUpdate(data);
	};

	const handleReadPost = async () => {
		const resp = await getFile(`http://localhost:5000/${pdf}`);
		const file = new Blob([resp.data], { type: 'application/pdf' });
		const fileURL = URL.createObjectURL(file);
		window.open(fileURL);
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
				{/*<div>
					<span>{pdf}</span>
				</div>*/}
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
					<button className="read-more" onClick={handleReadPost}>
						Read More
					</button>
				</div>
			</div>
			<div>
				{getCurrentUser() && getCurrentUser()._id === urlUserId ? (
					<div className="edit-bar">
						<EditButton
							icon="fas fa-heading"
							placeholder="New title"
							onChange={(event) =>
								setNewTitle(event.target.value)
							}
							error={errorMsg.newTitleError}
						/>
						<EditButton
							icon="far fa-image"
							fileInput
							accept=".jpg, .jpeg, .png"
							onChange={(event) =>
								setNewImgFile(event.target.files[0])
							}
							error={errorMsg.newImgError}
						/>
						<EditButton
							icon="far fa-file-pdf"
							fileInput
							accept="application/pdf"
							onChange={(event) =>
								setNewPdfDoc(event.target.files[0])
							}
							error={errorMsg.newPdfError}
						/>
						<EditButton
							icon="fas fa-align-left"
							placeholder="New description"
							onChange={(event) =>
								setNewDescription(event.target.value)
							}
							error={errorMsg.newDescError}
						/>
						<div className="confirm-btn">
							<Button
								icon="far fa-paper-plane"
								onClick={updatePost}
							/>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}
