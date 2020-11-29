import React from 'react';

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
