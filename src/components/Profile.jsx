import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { publishPost } from '../services/postService';

export default function Profile() {
	const [title, setTitle] = useState('');
	const [imgFile, setImgFile] = useState('');
	const [pdfDoc, setPdfDoc] = useState('');
	const [description, setDescription] = useState('');

	const handlePublisher = async () => {
		const fd = new FormData();
		fd.append('userId', '5faf90b66aad8807403be61a');
		fd.append('title', title);
		//fd.append('thumbnailImg', imgFile, imgFile.name);
		//fd.append('pdfDoc', pdfDoc, pdfDoc.name);
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
						<Input
							type="text"
							placeholder="Title"
							onChange={(event) => setTitle(event.target.value)}
						/>
						<Input
							type="file"
							placeholder="Select thumbnail"
							icon="fas fa-file-image"
							onChange={(event) =>
								setImgFile(event.target.files[0])
							}
						/>
						<Input
							type="file"
							placeholder="Select document"
							icon="fas fa-file-pdf"
							onChange={(event) =>
								setPdfDoc(event.target.files[0])
							}
						/>
						<Input
							type="text"
							placeholder="Description"
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
