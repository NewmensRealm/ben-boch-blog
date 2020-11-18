import React, { useRef } from 'react';
import Button from '../Button';

export default function FancyInput({ accept, type, name, placeholder, onChange, icon }) {
	const fileInput = useRef();

	const handleFilePick = () => {
		fileInput.current.click();
	};

	return (
		<div className="field">
			<input
				ref={fileInput}
				type={type}
				name={name}
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
