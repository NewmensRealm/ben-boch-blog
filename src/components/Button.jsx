import React from 'react';
import '../styles/styles.css';

export default function Button({ icon, title, onClick }) {
	if (title)
		return (
			<button className="default" onClick={onClick}>
				{title}
			</button>
		);

	return (
		<button className="menuButton" onClick={onClick}>
			<i className={icon} />
		</button>
	);
}
