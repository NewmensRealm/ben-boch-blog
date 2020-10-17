import React from "react";
import "../styles/styles.css";

export default function NavBar() {
	return (
		<nav>
			<ul>
				<li>
					<a href='#home' className='active'>
						Home
					</a>
				</li>
				<li>
					<a href='#news'>News</a>
				</li>
				<li>
					<a href='#contact'>Contact</a>
				</li>
				<li>
					<a href='#about'>About</a>
				</li>
			</ul>
		</nav>
	);
}
