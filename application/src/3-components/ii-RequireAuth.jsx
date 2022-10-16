import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../1-hooks/useAuth';

function RequireAuth() {
	const { auth } = useAuth();
	const location = useLocation();

	useEffect(() => {
	}, []);
	
	
	return auth?.token ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}

export default RequireAuth;

/* -- Alternative Persistent Login - Work in Progress --*/

// useEffect(() => {
// const fetchDisplayName = async ()=> {
// 	const settings = {
// 		method: 'GET',
// 		headers: {
// 			Accept: 'application/json',
// 			'Access-Control-Allow-Headers': true,
// 			'Content-Type': 'application/json',
// 			'Access-Control-Allow-Origin': '*',
// 			Token: auth.token,
// 		},
// 		withCredentials: true,
// 	};
// 	const response = await fetch(`${process.env.REACT_APP_API}user/${auth.userId}`, settings);
// 	//const jsonData = await response.json();
// };
// fetchDisplayName();
// }, []);

// function RequireAuth({ allowedRoles }) {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
//         <Outlet />
//     ) : auth?.user ? (
//         <Navigate to="/unauthorized" state={{ from: location }} replace />
//     ) : (
//         <Navigate to="/login" state={{ from: location }} replace />
//     );
// }


