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
			<div className="form">
				<h1 className="login-header">LogIn</h1>
				<form>
					<FancyInput type="email" placeholder="Email" />
					<FancyInput type="password" placeholder="Password" />
				</form>
				<Button title="Log In" />
			</div>
		</>
	);
}
