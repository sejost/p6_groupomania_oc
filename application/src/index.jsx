/* Gather all the App Information and Providers then use Routes to manage all 
Finally sending the global redenring into the index html page inside root */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './2-contexts/AuthProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ReactApp = () => {
	const application = (
		<React.StrictMode>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</AuthProvider>
			</Router>
		</React.StrictMode>
	);
	root.render(application);
};

ReactApp();
