import React from 'react';
import Warning from '../utils/Warning';

export default function Input({ error, type, placeholder, refer, onChange }) {
	return (
		<>
			<div className="input-container">
				<input
					ref={refer}
					className="basic-input"
					type={type}
					placeholder={placeholder}
					onChange={onChange}
				/>
			</div>
			<Warning message={error} />
		</>
	);
}
