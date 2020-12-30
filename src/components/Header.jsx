import React from 'react';

export default function Header({ icon, title, styles }) {
	return (
		<div className="header" style={styles}>
			{icon && <i className={icon}></i>}
			<label>{title}</label>
		</div>
	);
}
