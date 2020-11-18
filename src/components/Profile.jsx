import React, { useState } from 'react';
import FancyInput from './input/FancyInput';
import Button from './Button';
import { publishPost } from '../services/postService';

export default function Profile() {
	const [title, setTitle] = useState('');
	const [imgFile, setImgFile] = useState('');
	const [pdfDoc, setPdfDoc] = useState('');
	const [description, setDescription] = useState('');

	const handlePublisher = async () => {
		const fd = new FormData();
		fd.append('userId', '5faea26d74db530a30877b0f');
		fd.append('title', title);
		fd.append('thumbnailImg', imgFile, imgFile.name);
		fd.append('pdfDoc', pdfDoc, pdfDoc.name);
		fd.append('description', description);

		try {
			const res = await publishPost(fd);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container">
			<div className="profile">
				<h1>Profile</h1>
				<div className="profile-img"></div>
			</div>
			<div className="stats">
				<div className="stats-item">
					<span className="item-title">-Uploads-</span>
					<span>0</span>
				</div>
				<div className="stats-item">
					<span className="item-title">-Rank-</span>
					<span>Novice</span>
				</div>
				<div className="stats-item">
					<span className="item-title">-Clan-</span>
					<span>Philosophers</span>
				</div>
			</div>
			<div className="post-form">
				<div className="form">
					<h1 className="login-header">Post</h1>
					<form>
						<FancyInput
							type="text"
							placeholder="Title"
							name='title'
							onChange={(event) => setTitle(event.target.value)}
						/>
						<FancyInput
							type="file"
							placeholder="Select thumbnail"
							name='thumbnailImg'
							accept="image/*"
							icon="fas fa-file-image"
							onChange={(event) =>
								setImgFile(event.target.files[0])
							}
						/>
						<FancyInput
							type="file"
							name='pdfDoc'
							placeholder="Select document"
							accept="application/pdf"
							icon="fas fa-file-pdf"
							onChange={(event) =>
								setPdfDoc(event.target.files[0])
							}
						/>
						<FancyInput
							type="text"
							placeholder="Description"
							name='description'
							onChange={(event) =>
								setDescription(event.target.value)
							}
						/>
					</form>
					<Button title="Publish" onClick={handlePublisher} />
				</div>
			</div>
		</div>
	);
}
