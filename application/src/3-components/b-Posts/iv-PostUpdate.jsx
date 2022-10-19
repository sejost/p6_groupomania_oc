/* -- Posts Update React --*/
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuth from '../../1-hooks/useAuth';
import { BiSend } from 'react-icons/bi';


/* -- Posts Update Main Function --*/
const PostUpdate = (props) => {
	const { auth } = useAuth();

	const handleSetUpdate = async (e) => {
		e.preventDefault();

		/* -- Preparing the updating data into a FormData --*/
		let data = new FormData();
		//!props.updatePicture ? null : data.append('image', props.updatePicture);
		data.append('image', props.updatePicture);
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
			props.setChangePending(false);
		}
		catch(error){
			alert(error);
		}
	};

	return(
		<BiSend onClick={handleSetUpdate} className='icon icon__tools icon__send'/>
	);

};

export default PostUpdate;

PostUpdate.propTypes = {
	postId: PropTypes.string,
	updatePicture: PropTypes.string,
	postContent: PropTypes.object,
	setChangePending: PropTypes.func,
};
