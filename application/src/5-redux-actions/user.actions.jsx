import useAuth from '../1-hooks/useAuth';

export const GET_USER = 'GET_USER';

const {auth, setAuth} = useAuth;

export const getUser = (auth) => {
	return (dispatch) =>  {
		const settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Headers': true,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			withCredentials: true,
			body: JSON.stringify({ email, password }),
		};
		try{
			const response = fetch(`${process.env.REACT_APP_API}user/${auth.userId}`, settings);
			dispatch({type: GET_USER, payload: response.data});
		}
		catch(error){
			console.log(error);
		}

	};
};