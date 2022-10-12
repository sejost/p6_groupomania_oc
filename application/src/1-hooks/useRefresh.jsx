import { useContext } from 'react';
import RefreshContext from '../2-contexts/RefreshProvider';

const useRefresh = () => {
	return useContext(RefreshContext);
};

export default useRefresh;
