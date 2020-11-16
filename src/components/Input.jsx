import React, { useRef } from 'react';
import Button from './Button';

export default function Input({ type, placeholder, onChange, icon }) {
	const fileInput = useRef();

	const handleFilePick = () => {
		fileInput.current.click();
	};

	return (
		<div className="field">
			<input
				ref={fileInput}
				style={null /*type === 'file' ? { display: 'none' } : {}*/}
				type={type}
				name={type}
				className="input"
				placeholder=" "
				onChange={onChange}
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
