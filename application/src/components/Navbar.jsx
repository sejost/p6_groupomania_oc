import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../styles/5-images/globe-logo.jpg';
import useAuth from '../hooks/useAuth';

function Navbar() {
	const { auth } = useAuth();
	// console.log('mon auth : ', {auth});
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
								{/* <h5>Bienvenue {userData.pseudo}</h5>  */}
								<h5>Bienvenue</h5>
							</NavLink>
						</li>
						<a href="/#">Button Logout</a>
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
