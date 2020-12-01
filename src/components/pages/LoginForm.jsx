import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FancyInput from '../input/FancyInput';
import Button from '../utils/Button';
import '@fortawesome/fontawesome-free/css/all.css';
import { login } from '../../services/authService';

export default function LoginForm() {
	const [user, setUser] = useState({ email: '', password: '' });

	const handleLogin = async () => {
		try {
			await login(user.email, user.password);
			window.location = '/main';
		} catch (error) {}
	};

	return (
		<>
			<Link to="/main/home">
				<Button icon="fas fa-arrow-left" />
			</Link>
			<div className="form">
				<h1 className="login-header">LogIn</h1>
				<form>
					<FancyInput
						type="email"
						placeholder="Email"
						onChange={(event) =>
							setUser({ ...user, email: event.target.value })
						}
					/>
					<FancyInput
						type="password"
						placeholder="Password"
						onChange={(event) =>
							setUser({ ...user, password: event.target.value })
						}
					/>
				</form>
				<Button title="Log In" onClick={handleLogin} />
			</div>
		</>
	);
}
