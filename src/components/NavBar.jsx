import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';

export default function NavBar() {
	return (
		<nav className="sticky">
			<ul>
				<li>
					<NavLink to="/main/home">Home</NavLink>
				</li>
				<li>
					<NavLink to="/main/gallery">Gallery</NavLink>
				</li>
				<li>
					<NavLink to="/main/contact">Contact</NavLink>
				</li>
				<li>
					<NavLink to="/main/about">About</NavLink>
				</li>
			</ul>
		</nav>
	);
}
