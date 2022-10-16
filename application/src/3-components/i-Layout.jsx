/* -- Main Layout React --*/
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './iii-Navbar';

/* -- Display the Navbar on every outlets components --*/
function Layout() {
	return (
		<main>
			<Navbar />
			<Outlet />
		</main>
	);
}

export default Layout;
