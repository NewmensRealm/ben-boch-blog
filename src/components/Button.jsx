import React from 'react';
import '../styles/styles.css';

export default function Button({ icon, title, style, onClick }) {
	if (title)
		return (
			<button className="default" style={style} onClick={onClick}>
				{title}
			</button>
		);

	return (
		<button className="menuButton" style={style} onClick={onClick}>
			<i className={icon} />
		</button>
	);
}
