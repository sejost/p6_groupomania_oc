import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../6-styles/5-images/globe-logo.jpg';
import useAuth from '../1-hooks/useAuth';
import Logout from './a-Logs/Logout';

function Navbar() {
	const { auth } = useAuth();
	// const userData = useSelector((state) => state.userReducer);

	return (
		<nav>
			<div className="nav-container">
				<div className="logo">
					<NavLink exact to="/">
						<div className="logo">
							<img src={logo} alt="icon" />
						</div>
					</NavLink>
				</div>
				{auth.userId ? (
					<ul>
						<li />
						<li className="welcome">
							<NavLink exact to="/profil">
								<h5>Bienvenue {auth.displayName}</h5>
							</NavLink>
						</li>
						<Logout />
					</ul>
				) : (
					<ul>
						<li />
						<li>
							<NavLink exact to="/profil">
								<h5>Il faut se logger</h5>
							</NavLink>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
