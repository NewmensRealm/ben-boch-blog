import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/styles.css';

export default function Banner() {
	return (
		<div id="banner">
			<div className="bannerImg">
				<img
					src={require('../assets/images/bannerImg.jpg')}
					alt="Main banner logo"
				/>
			</div>
			<span>B.E.N. Boch</span>
			<div id="accessMenu">
				<Link to="/login" className="menuButton">
					<i className="fas fa-sign-in-alt" />
				</Link>
				<Link to="/register" className="menuButton">
					<i className="fas fa-plus" />
				</Link>
			</div>
		</div>
	);
}
