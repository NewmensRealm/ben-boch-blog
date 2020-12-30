import React from 'react';
import FileInput from '../input/FileInput';
import Input from '../input/Input';
import Form from './Form';
import Button from '../utils/Button';
import TextArea from '../input/TextArea';

export default function PostForm({
	onTitle,
	onImgFile,
	img,
	onPdfDoc,
	onDesc,
	cancel,
	publish,
}) {
	return (
		<Form>
			<Input type="text" placeholder="Title" onChange={onTitle} />
			{img ? (
				<img className="thumbnail" src={img} alt="New post thumbnail" />
			) : (
				<img
					className="thumbnail"
					src={require('../../assets/images/placeholder-image.png')}
					alt="New post thumbnail"
				/>
			)}
			<FileInput
				type="file"
				name="imgFile"
				placeholder="Select image"
				accept=".jpeg, .jpg, .png"
				onChange={onImgFile}
			/>
			<FileInput
				type="file"
				name="pdfDoc"
				placeholder="Select document"
				accept="application/pdf"
				onChange={onPdfDoc}
			/>
			{/*<Input type="text" placeholder="Description" onChange={onDesc} />*/}
			<TextArea
				placeholder="Write here a description of your post"
				onChange={onDesc}
			/>
			<div>
				<Button title="Cancel" onClick={cancel} />
				<Button title="Publish" onClick={publish} />
			</div>
		</Form>
	);
}
