import React, { useState } from 'react';
import Button from './utils/Button';
import Input from './input/Input';
import InputForm from './input/InputForm';
import FileInput from './input/FileInput';
import Joi from 'joi-browser';
import { getCurrentUser } from '../services/authService';

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
	const [modifyMod, setModifyMod] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [newImgFile, setNewImgFile] = useState();
	const [newPdfDoc, setNewPdfDoc] = useState();
	const [newDescription, setNewDescription] = useState();

	const data = {
		newTitle,
		newImgFile,
		newPdfDoc,
		newDescription,
	};

	const schema = {
		newTitle: Joi.string().trim().min(5).max(50).required().label('Title'),
		newImgFile: Joi.object().required().label('Thumbnail Image'),
		newPdfDoc: Joi.object().required().label('PDF'),
		newDescription: Joi.string()
			.trim()
			.min(10)
			.max(255)
			.required()
			.label('Description'),
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
		console.log(data);
		onClickUpdate(data);
	};

	const readPost = () => {
		onClickRead('read');
	};

	return (
		<div className="card">
			<div className="post-header-section">
				<h2 className="post-header">{title}</h2>
				<span>
					`by <strong>{author} </strong>`
				</span>
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
			{modifyMod && (
				<InputForm>
					<Input
						type="text"
						placeholder="New Title"
						onChange={(event) => setNewTitle(event.target.value)}
					/>
					<FileInput
						icon="fas fa-file-image"
						accept="image/jpeg,image/png"
						placeholder="New image"
						onChange={(event) =>
							setNewImgFile(event.target.files[0])
						}
					/>
					<FileInput
						icon="fas fa-file-pdf"
						accept="application/pdf"
						placeholder="New PDF"
						onChange={(event) =>
							setNewPdfDoc(event.target.files[0])
						}
					/>
					<Input
						type="text"
						placeholder="New Description"
						onChange={(event) =>
							setNewDescription(event.target.value)
						}
					/>
					<Button
						icon="fas fa-cloud-upload-alt"
						onClick={updatePost}
					/>
				</InputForm>
			)}
			<div className="btn-section">
				{getCurrentUser() && getCurrentUser().username === author ? (
					<div>
						<button
							className="modify"
							onClick={() => setModifyMod(!modifyMod)}>
							Modify
						</button>
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
	);
}
