import React from 'react';

export default function Header({ icon, title }) {
	return (
		<div className="header">
			{icon && <i className={icon}></i>}
			<span>{title}</span>
		</div>
	);
}
