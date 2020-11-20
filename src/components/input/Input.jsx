import React from 'react';

export default function Input({ type, placeholder, refer, onChange }) {
	return (
		<div className="input-container">
			<input
				ref={refer}
				className="basic-input"
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
}
