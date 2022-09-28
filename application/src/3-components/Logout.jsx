import React from 'react';
import useAuth from '../1-hooks/useAuth';

const Logout = () => {
	const{setAuth} = useAuth();

	const handleLogout = async (e) => {
		e.preventDefault();
		
		const settings = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await fetch(`${process.env.REACT_APP_API}auth/logout`, settings);
		setAuth(' ');
	};

	return (
		<button onClick={handleLogout}>Se déconnecter</button>
	);
};

export default Logout;