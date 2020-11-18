import React from 'react';
import { Link } from 'react-router-dom';
import FancyInput from '../input/FancyInput';
import Button from '../Button';
import '@fortawesome/fontawesome-free/css/all.css';

export default function LoginForm() {
	return (
		<>
			<Link to="/main/home">
				<Button icon="fas fa-arrow-left" />
			</Link>
			<div className="form card-form">
				<h1 className="login-header">Register</h1>
				<form>
					<FancyInput type="email" placeholder="Email" />
					<FancyInput type="text" placeholder="Username" />
					<FancyInput type="password" placeholder="Password" />
				</form>
				<Button title="Register" />
			</div>
		</>
	);
}
