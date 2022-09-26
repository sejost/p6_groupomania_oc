import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
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
				</Route>

				{/* Catch all */}
				<Route path="*" element={<div>Error !</div>} />
			</Route>
		</Routes>
	);
}

export default App;
