import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavItem({ name, destination, icon }) {
	return (
		<NavLink to={destination} style={{ textDecoration: 'none' }}>
			<div className="nav-item">
				<label className="nav-text">{name}</label>
				{icon && <i className={icon}></i>}
			</div>
		</NavLink>
	);
}
