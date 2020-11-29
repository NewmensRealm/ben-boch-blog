import React from 'react';
import NavItem from './NavItem';

export default function NavBar() {
	return (
		<div className="navbar">
			<nav>
				<ul>
					<li>
						<NavItem destination="/main/home" name="Home" />
					</li>
					<li>
						<NavItem destination="/main/gallery" name="Gallery" />
					</li>
					<li>
						<NavItem destination="/main/contact" name="Contact" />
					</li>
					<li>
						<NavItem destination="/main/about" name="About" />
					</li>
				</ul>
			</nav>
		</div>
	);
}
