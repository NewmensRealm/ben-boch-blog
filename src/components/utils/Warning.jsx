import React from 'react';

export default function Warning({ message }) {
	if (!message) return null;
	return (
		<div className="error-container">
			<i className="far fa-times-circle"></i>
			<label className="error-txt">{message}</label>
		</div>
	);
}
