import React from 'react';
import axios from 'axios';

import useAuth from '../../1-hooks/useAuth';


const CommentUpdate = (props) => {
	const { auth } = useAuth();

	const handleSetUpdate = async (e) => {
		e.preventDefault();
		console.log('coucou');
		try{
			console.log(props.commentId);

			// let response = await axios({
			// 	method: 'put',
			// 	url: `${process.env.REACT_APP_API}comment/update/${props.postId}`,
			// 	data : { 
			// 		commentId : props.commentId,
			// 		commenterId : auth.userId,
			// 		commentText : props.commentContent.message
			// 	},
			// 	withCredentials : true,
			// });
			// props.setChangePending(false);
		}
		catch(error){
			console.log(error);
		}
	};

	return(
		<button onClick={handleSetUpdate}>Valider modification</button>
	);

};

export default CommentUpdate;