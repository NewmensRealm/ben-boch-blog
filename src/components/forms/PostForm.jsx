import React, { useState } from 'react';
import Joi from 'joi-browser';
import FileInput from '../input/FileInput';
import Input from '../input/Input';
import Form from './Form';
import Button from '../utils/Button';
import TextArea from '../input/TextArea';

export default function PostForm({ cancel, publish }) {
	const [previewImg, setPreviewImg] = useState(null);
	const [postData, setPostData] = useState({
		title: '',
		imgFile: '',
		pdfDoc: '',
		description: '',
	});
	const [errorMsg, setErrorMsg] = useState({
		titleError: '',
		imgError: '',
		pdfError: '',
		descError: '',
	});

	const schema = {
		title: Joi.string().trim().min(3).max(50).required().label('Title'),
		imgFile: Joi.object().required().label('Thumbnail Image'),
		pdfDoc: Joi.object().required().label('PDF'),
		description: Joi.string()
			.trim()
			.min(10)
			.max(255)
			.required()
			.label('Description'),
	};

	const validate = () => {
		const { title, imgFile, pdfDoc, description } = postData;
		const options = { abortEarly: false };
		const { error } = Joi.validate(
			{ title, imgFile, pdfDoc, description },
			schema,
			options
		);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};

	const handlePublish = () => {
		const error = validate();

		if (error) {
			const { title, imgFile, pdfDoc, description } = error;
			setErrorMsg({
				titleError: title,
				imgError: imgFile,
				pdfError: pdfDoc,
				descError: description,
			});
			return null;
		}
		publish(postData);
	};

	const handleImgUpdate = (event) => {
		setPostData({
			...postData,
			imgFile: event.target.files[0],
		});
		setPreviewImg(URL.createObjectURL(event.target.files[0]));
	};

	return (
		<Form>
			<Input
				type="text"
				placeholder="Title"
				onChange={(event) =>
					setPostData({
						...postData,
						title: event.target.value,
					})
				}
				error={errorMsg.titleError}
			/>
			{previewImg ? (
				<img
					className="thumbnail"
					src={previewImg}
					alt="New post thumbnail"
					style={{ marginTop: '5px', marginBottom: '5px' }}
				/>
			) : (
				<img
					className="thumbnail"
					src={require('../../assets/images/placeholder-image.png')}
					alt="New post thumbnail"
					style={{ marginTop: '5px', marginBottom: '5px' }}
				/>
			)}
			<FileInput
				type="file"
				name="imgFile"
				placeholder="Select image"
				accept=".jpeg, .jpg, .png"
				onChange={(event) => handleImgUpdate(event)}
				error={errorMsg.imgError}
			/>
			<FileInput
				type="file"
				name="pdfDoc"
				placeholder="Select document"
				accept="application/pdf"
				onChange={(event) =>
					setPostData({
						...postData,
						pdfDoc: event.target.files[0],
					})
				}
				error={errorMsg.pdfError}
			/>
			{/*<Input type="text" placeholder="Description" onChange={onDesc} />*/}
			<TextArea
				placeholder="Write here a description of your post"
				onChange={(event) =>
					setPostData({
						...postData,
						description: event.target.value,
					})
				}
				error={errorMsg.descError}
			/>
			<div>
				<Button title="Cancel" onClick={cancel} />
				<Button title="Publish" onClick={handlePublish} />
			</div>
		</Form>
	);
}
