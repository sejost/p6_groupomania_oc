import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../1-hooks/useAuth';


const PostUpdate = (props) => {
	const { auth } = useAuth();


	const handleSetUpdate = async (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append('image', props.upPicture);
		data.append('userId', auth.userId);
		data.append('postTitle', props.postContent.title);
		data.append('postText', props.postContent.message);
		try{
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