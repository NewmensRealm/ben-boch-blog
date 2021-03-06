import React from 'react';
import Warning from '../utils/Warning';

export default function TextArea({ error, onChange, placeholder }) {
	return (
		<>
			<label htmlFor="post-description">Desription</label>
			<textarea
				id="post-description"
				name="post-description"
				className="text-area"
				rows="5"
				cols="50"
				placeholder={placeholder}
				onChange={onChange}></textarea>
			<Warning message={error} />
		</>
	);
}
