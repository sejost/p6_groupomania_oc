/* --- Logout Component React ---*/
/* --- Purpose : Handle Logout Button, remove the token and redirect to the home page ---*/
import React from 'react';
import useAuth from '../../1-hooks/useAuth';
import axios from 'axios';
import Cookies from 'js-cookie';

const Logout = () => {
	const{setAuth} = useAuth();

	const handleLogout = async (e) => {
		e.preventDefault();

		//Send the get auth/logout, will inevitably failed because we cannot "get" this route
		try{
			axios({
				method: 'get',
				url: `${process.env.REACT_APP_API}auth/logout`,
				withCredentials: true,
			});
			setAuth(' ');
			Cookies.remove(token, { expires: 1 });
		}
		catch(error){
			setAuth(' ');
			Cookies.remove(token, { expires: 1 });
			console.log(error);
		}
		
		

	};

	return (
		<a className='link' onClick={handleLogout}>Se Déconnecter</a>
	);
};

export default Logout;