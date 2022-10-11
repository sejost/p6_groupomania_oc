import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../1-hooks/useAuth';


const PostUpdate = (props) => {
	const { auth } = useAuth();


	const handleSetUpdate = async (e) => {
		e.preventDefault();
		let data = new FormData();
		//!props.updatePicture ? null : data.append('image', props.updatePicture);
		data.append('image', props.updatePicture);
		data.append('userId', auth.userId);
		data.append('postTitle', props.postContent.title);
		data.append('postText', props.postContent.message);
		console.log(data);
		try{
			console.log(props.updatePicture);
			await axios({
				method: 'put',
				url: `${process.env.REACT_APP_API}post/update/${props.postId}`,
				data,
				withCredentials : true,
			});
		}
		catch(error){
			console.log(error);
		}
	};

	return(
		<button onClick={handleSetUpdate}>Valider modification</button>
	);

};

export default PostUpdate;