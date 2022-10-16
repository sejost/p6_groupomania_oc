import React from 'react';
import useAuth from '../../1-hooks/useAuth';
import axios from 'axios';
import Cookies from 'js-cookie';

const Logout = () => {
	const{setAuth} = useAuth();

	const handleLogout = async (e) => {
		e.preventDefault();

		console.log(process.env.REACT_APP_API);
		try{
			axios({
				method: 'get',
				url: `${process.env.REACT_APP_API}auth/logout`,
				withCredentials: true,
			});
			setAuth(' ');
			Cookies.remove(token, { expires: 1 });
		}
		catch{
			setAuth(' ');
			Cookies.remove(token, { expires: 1 });
		}
		
		

	};

	return (
		<button onClick={handleLogout}>Se déconnecter</button>
	);
};

export default Logout;