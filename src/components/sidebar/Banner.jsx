import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import Header from '../Header';
import RollBar from '../RollBar';
import RollBarItem from '../RollBarItem';
import Devider from '../utils/Devider';

export default function Banner() {
	return (
		<div className="banner">
			<Header title="B.E.N Boch Blog" icon="fab fa-audible" />
			<Devider />
			<RollBar icon="fas fa-location-arrow">
				<RollBarItem destination="/login" icon="fas fa-sign-in-alt" />
				<RollBarItem destination="/register" icon="fas fa-plus" />
				<RollBarItem destination="/profile" icon="fas fa-user-alt" />
			</RollBar>
		</div>
	);
}
