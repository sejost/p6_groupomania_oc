/* ---- Auth Provider ---*/
/* ---- Purpose : To provide the Auth Context through the pages wich need it ---*/
import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';


const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const [auth, setAuth] = useState({});
	
	if (Object.entries(auth) == 0 && !!Cookies.get('token')){
		const userId = Cookies.get('userId');
		console.log(userId);
		setAuth({
			token : Cookies.get('token'),
			userId : userId,
			displayName : Cookies.get(`${userId}usr`)
		});
	}

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;