import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './2-contexts/AuthProvider';
import { RefreshProvider } from './2-contexts/RefreshProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ReactApp = () => {
	const application = (
		<React.StrictMode>
			<Router>
				<AuthProvider>
					<RefreshProvider>
						<Routes>
							<Route path="/*" element={<App />} />
						</Routes>
					</RefreshProvider>
				</AuthProvider>
			</Router>
		</React.StrictMode>
	);
	root.render(application);
};

ReactApp();
