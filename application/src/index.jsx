import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './2-contexts/AuthProvider';
import App from './App';

// import store from './store';
// import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ReactApp = () => {
	const application = (
		<React.StrictMode>
			<Router>
				{/* <Provider store={store}> */}
				<AuthProvider>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</AuthProvider>
				{/* </Provider> */}
			</Router>
		</React.StrictMode>
	);
	root.render(application);
};

ReactApp();
