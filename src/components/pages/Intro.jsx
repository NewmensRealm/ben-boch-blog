import React from 'react';
import {Link} from "react-router-dom"
import Button from "../Button";

export default function Intro() {
	return (
		
		<div id="intro-space">
			<Link to="/main/home">
				<Button icon="fas fa-location-arrow"/>
			</Link>
		<div className="intro-card">
			<Link to="/login">
			<div className="face front">
				<h2>SignIn</h2>
			</div>
			</Link>
			<Link to="/register">
			<div className="face back">
				<h2>SignUp</h2>
			</div>
			</Link>
		</div>
		</div>
		
	);
}

