/* Context Auth */
/* The purose of this file is to declare useAuth as a custom hooks */
import { useContext } from 'react';
import AuthContext from '../2-contexts/AuthProvider';

const useAuth = () => {
	return useContext(AuthContext);
};

export default useAuth;
