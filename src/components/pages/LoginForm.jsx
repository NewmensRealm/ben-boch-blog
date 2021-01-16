import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FancyInput from '../input/FancyInput';
import Button from '../utils/Button';
import '@fortawesome/fontawesome-free/css/all.css';
import { getCurrentUser, login } from '../../services/authService';
import { useHistory } from 'react-router-dom';
import Warning from '../utils/Warning';

export default function LoginForm() {
	const [user, setUser] = useState({ email: '', password: '' });
	const [errorMsg, setErrorMsg] = useState('');

	const history = useHistory();

	const handleLogin = async () => {
		try {
			await login(user.email, user.password);
			const userId = getCurrentUser()._id;
			history.push(`/profile/${userId}`);
		} catch (error) {
			setErrorMsg('Username or Password is Incorrect!');
		}
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
				<Warning message={errorMsg} />
				<Button title="Log In" onClick={handleLogin} />
			</div>
		</>
	);
}
