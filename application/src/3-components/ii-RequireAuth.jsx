/* -- Require Auth Component React --*/
import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../1-hooks/useAuth';


/* This function makes it possible to be sure that the user returns a 
token from the Auth context, otherwise it is sent to the login page*/
function RequireAuth() {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.token ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}

export default RequireAuth;
