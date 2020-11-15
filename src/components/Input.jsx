import React from 'react';

export default function Input({ type, placeholder, onChange }) {
	return (
		<div className="field">
			<input
				style={type === 'file' ? { display: 'none' } : {}}
				type={type}
				name={type}
				className="input"
				placeholder=" "
				onChange={onChange}
			/>
			<label htmlFor={type} className="label">
				{placeholder}
			</label>
		</div>
	);
}
