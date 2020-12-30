import React from 'react';

import Button from './utils/Button';
import { getCurrentUser, logout } from '../services/authService';
import { Link } from 'react-router-dom';

export default function TopBar() {
	const handleLogOut = () => {
		logout();
		window.location = '/main';
	};

	return (
		<div className="top-bar">
			{getCurrentUser() ? (
				<>
					<Link to={`/profile/${getCurrentUser()._id}`}>
						<Button title="Profile" />
					</Link>

					<Button title="LogOut" onClick={handleLogOut} />
				</>
			) : (
				<>
					<Link to="/login">
						<Button title="LogIn" />
					</Link>
					<Link to="/register">
						<Button title="Register" />
					</Link>
				</>
			)}
		</div>
	);
}
