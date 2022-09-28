import { GET_USER } from '../5-redux-actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
	switch (action.type){
	case GET_USER:
		return action.payload;
	default:
		return state;
	}
}