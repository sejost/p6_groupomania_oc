import React from 'react';
import axios from 'axios';

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
			let response = await axios({
				method: 'put',
				url: `${process.env.REACT_APP_API}post/update/${props.postId}`,
				data,
				withCredentials : true,
			});
			props.setChangePending(false);
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