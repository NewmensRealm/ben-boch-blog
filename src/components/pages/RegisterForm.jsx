import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FancyInput from '../input/FancyInput';
import Button from '../utils/Button';
import '@fortawesome/fontawesome-free/css/all.css';
import Joi from 'joi-browser';
import { register } from '../../services/userService';
import { loginWithJWT } from '../../services/authService';

export default function RegisterForm() {
	const [newUserData, setnewUserData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const schema = {
		username: Joi.string()
			.trim()
			.min(3)
			.max(10)
			.required()
			.label('Username'),
		email: Joi.string()
			.email()
			.min(6)
			.max(30)
			.required()
			.trim()
			.label('Email'),
		password: Joi.string().min(6).max(1024).required().label('Password'),
	};

	const validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(newUserData, schema, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};

	const handleRegister = async () => {
		const result = validate();

		if (result) return null;

		try {
			const response = await register(newUserData);
			loginWithJWT(response.headers['x-auth-token']);
			window.location = '/main';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				console.log('User already registered...');
			}
		}
	};

	return (
		<>
			<Link to="/main/home">
				<Button icon="fas fa-arrow-left" />
			</Link>
			<div className="form card-form">
				<h1 className="login-header">Register</h1>
				<div>
					<FancyInput
						type="text"
						placeholder="Username"
						onChange={(event) =>
							setnewUserData({
								...newUserData,
								username: event.target.value,
							})
						}
					/>
					<FancyInput
						type="email"
						placeholder="Email"
						onChange={(event) =>
							setnewUserData({
								...newUserData,
								email: event.target.value,
							})
						}
					/>
					<FancyInput
						type="password"
						placeholder="Password"
						onChange={(event) =>
							setnewUserData({
								...newUserData,
								password: event.target.value,
							})
						}
						newUserData
					/>
				</div>
				<Button title="Register" onClick={handleRegister} />
			</div>
		</>
	);
}
