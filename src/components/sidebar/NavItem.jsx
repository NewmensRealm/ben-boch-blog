import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavItem({ name, onClick, destination, icon }) {
	return (
		<NavLink to={destination} style={{ textDecoration: 'none' }}>
			<div className="nav-item" onClick={onClick}>
				<span className="nav-text">{name}</span>
				{icon && <i className={icon}></i>}
			</div>
		</NavLink>
	);
}
