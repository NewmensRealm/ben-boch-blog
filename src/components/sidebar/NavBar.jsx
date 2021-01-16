import React, { useState } from 'react';
import Modal from '../Modal';
import NavItem from './NavItem';
import Button from '../utils/Button';
import { getCurrentUser, logout } from '../../services/authService';

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);

	const handleLogOut = () => {
		logout();
		window.location = '/main';
	};
	return (
		<>
			<div className="burger-btn">
				<Button
					icon="fas fa-bars fa-2x"
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>
			<Modal isOpen={isOpen}>
				<div className="modal-nav">
					<Button
						icon="fas fa-times fa-2x"
						onClick={() => setIsOpen(!isOpen)}
					/>
					<NavItem
						destination="/main/home"
						name="Home"
						onClick={() => setIsOpen(!isOpen)}
					/>
					<NavItem
						destination="/main/gallery"
						name="Gallery"
						onClick={() => setIsOpen(!isOpen)}
					/>
					<NavItem
						destination="/main/contact"
						name="Contact"
						onClick={() => setIsOpen(!isOpen)}
					/>
					<NavItem
						destination="/main/about"
						name="About"
						onClick={() => setIsOpen(!isOpen)}
					/>

					{getCurrentUser() ? (
						<>
							<NavItem
								destination={`/profile/${getCurrentUser()._id}`}
								name="Profile"
							/>
							<Button title="LogOut" onClick={handleLogOut} />
						</>
					) : (
						<>
							<NavItem destination="/login" name="Login" />{' '}
							<NavItem destination="/register" name="Register" />
						</>
					)}
				</div>
			</Modal>

			<div className="navbar">
				<nav>
					<ul>
						<li>
							<NavItem destination="/main/home" name="Home" />
						</li>
						<li>
							<NavItem
								destination="/main/gallery"
								name="Gallery"
							/>
						</li>
						<li>
							<NavItem
								destination="/main/contact"
								name="Contact"
							/>
						</li>
						<li>
							<NavItem destination="/main/about" name="About" />
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}
