import React from 'react';

import Button from './utils/Button';
import { getCurrentUser, logout } from '../services/authService';
import { Link, useHistory } from 'react-router-dom';

export default function TopBar() {
	const history = useHistory();

	const handleLogOut = () => {
		logout();
		window.location = '/main';
	};

	return (
		<div className="top-bar">
			{getCurrentUser() ? (
				<>
					<Button
						title="Profile"
						onClick={() => {
							history.push(`/profile/${getCurrentUser()._id}`);
						}}
					/>
					<Button title="LogOut" onClick={handleLogOut} />
				</>
			) : (
				<>
					<Button
						title="LogIn"
						onClick={() => {
							history.push('/login');
						}}
					/>

					<Button
						title="Register"
						onClick={() => {
							history.push('/register');
						}}
					/>
				</>
			)}
		</div>
	);
}
