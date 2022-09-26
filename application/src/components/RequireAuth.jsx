import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

function RequireAuth() {
	const { auth } = useAuth();
	const location = useLocation();

	useEffect(() => {
		const fetchToken = async ()=> {
			const settings = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Access-Control-Allow-Headers': true,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				withCredentials: true,
			};
			const response = await fetch(`${process.env.REACT_APP_API}jwtid`, settings);
			const jsonData = await response.json();
			//console.log('ma data : ', response);
		};
		fetchToken();
	}, []);
	
	return auth?.token ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}

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

export default RequireAuth;
