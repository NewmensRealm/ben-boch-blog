import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/styles.css";

export default function NavBar() {
	return (
		<nav className='sticky'>
			<ul>
				<li>
					<NavLink to='/home'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/gallery'>Gallery</NavLink>
				</li>
				<li>
					<NavLink to='/contact'>Contact</NavLink>
				</li>
				<li>
					<NavLink to='/about'>About</NavLink>
				</li>
			</ul>
		</nav>
	);
}
