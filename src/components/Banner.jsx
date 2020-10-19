import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/styles.css';

export default function Banner() {
	return (
		<div id="banner">
			<div id="bannerImg">
				<img
					src={require('../assets/images/bannerImg.jpg')}
					alt="Main banner logo"
				/>
			</div>
			<span>B.E.N. Boch</span>
			<div id="accessMenu">
				<Link to="/login">
					<Button icon="fas fa-sign-in-alt" />
				</Link>
				<Link to="/register">
					<Button icon="fas fa-plus" />
				</Link>
			</div>
		</div>
	);
}
