import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';

export default function NavBar() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/home">Home</NavLink>
				</li>
				<li>
					<NavLink to="/news">News</NavLink>
				</li>
				<li>
					<NavLink to="/contact">Contact</NavLink>
				</li>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
			</ul>
		</nav>
	);
}
