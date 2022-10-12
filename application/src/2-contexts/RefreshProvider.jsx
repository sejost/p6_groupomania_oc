import React, { createContext, useState } from 'react';

const RefreshContext = createContext({});

export function RefreshProvider({ children }) {
	const [refresh, setRefresh] = useState({});

	return (
		<RefreshContext.Provider value={{ refresh, setRefresh }}>
			{children}
		</RefreshContext.Provider>
	);
}

export default RefreshContext;
