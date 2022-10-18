/* -- Navbar React --*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../6-styles/5-images/logo.png';
import logoComputer from '../6-styles/5-images/basic-logo.jpg';
import useAuth from '../1-hooks/useAuth';
import Logout from './a-Logs/Logout';

function Navbar() {
	const { auth } = useAuth();

	return (
		<nav>
			<div className="nav-container">
				<div className="logo">
					<NavLink to="/">
						<div className="logo">
							<img src={logo} alt="icon" className='icon icon--short'/>
							<img src={logoComputer} alt="icon" className='icon icon--long'/>

						</div>
					</NavLink>
				</div>
				{auth.userId ? (
					<ul>
						<li className="welcome">
							<NavLink to="/profil" className='link'>
								Profil de {auth.displayName}
							</NavLink>
						</li>
						<li className="logout">
							<Logout />
						</li>
					</ul>
				) : (
					// <ul>
					// 	<li>
					// 		<NavLink to="/login" className='link'>
					// 			Se connecter
					// 		</NavLink>
					// 	</li>
					// </ul>
					null
				)
				}
			</div>
		</nav>
	);
}

export default Navbar;
