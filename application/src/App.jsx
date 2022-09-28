import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './4-pages/Home';
import Login from './4-pages/Login';
import Profil from './4-pages/Profil';
import RequireAuth from './3-components/RequireAuth';
import Layout from './3-components/Layout';
import './main.scss';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* Public Routes */}
				<Route path="/login" element={<Login />} />

				{/* Protected Routes */}
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Home />} />
					<Route path='/profil' element={<Profil />} />
				</Route>

				{/* Catch all */}
				<Route path="*" element={<div>Error !</div>} />
			</Route>
		</Routes>
	);
}

export default App;
