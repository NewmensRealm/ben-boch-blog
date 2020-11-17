import React, { useRef } from 'react';
import Button from './Button';

export default function Input({ accept, type, placeholder, onChange, icon }) {
	const fileInput = useRef();

	const handleFilePick = () => {
		fileInput.current.click();
	};

	return (
		<div className="field">
			<input
				ref={fileInput}
				type={type}
				name={type}
				className="input"
				placeholder=" "
				onChange={onChange}
				accept={accept}
			/>
			<label htmlFor={type} className="label">
				{placeholder}
			</label>
			{type === 'file' && (
				<div className="input-icon">
					<Button onClick={handleFilePick} icon={icon} />
				</div>
			)}
		</div>
	);
}
