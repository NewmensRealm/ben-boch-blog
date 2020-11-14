import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input';
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
					<Input type="email" placeholder="Email" />
					<Input type="text" placeholder="Username" />
					<Input type="password" placeholder="Password" />
				</form>
				<Button title="Register" />
			</div>
		</>
	);
}
