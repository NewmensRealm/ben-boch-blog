import React from 'react';

export default function Input({ type, placeholder }) {
	return (
		<div className="field">
			<input type={type} name={type} className="input" placeholder=" " />
			<label htmlFor={type} className="label">
				{placeholder}
			</label>
		</div>
	);
}
