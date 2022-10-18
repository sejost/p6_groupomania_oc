import React, { useState, useEffect }  from 'react';
import { TiThumbsOk } from 'react-icons/ti';
import { findUser } from './x-PostFunctions';
import PropTypes from 'prop-types';
import useAuth from '../../1-hooks/useAuth';

const axios = require('axios');

const PostLike = (props) => {
	const { auth } = useAuth();
	const [postId, setPostId] = useState('');

	/* -- On useEffect --*/
	/* -- Get the postId from parent  --*/
	/* -- Refresh on page loading  --*/
	useEffect(() => {
		setPostId(props.postId);
	}, []);
	
	const handleLikes = async (e) => {
		e.preventDefault();
		//await setPostId((e.target.id).split('_')[0]);
		try {
			let response = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API}post/like/${postId}`,
				data : {userId: auth.userId},
				withCredentials : true,
			});
			{props.setPostChanged(response.data);}
		}
		catch(error){
			console.error(error);
		}
	};

	return(
		<div className='post__footPart'>
			<TiThumbsOk 
				size='30'
				className={findUser(props.postsList, props.postId, auth.userId) ? 'icon icon__liked' :  'icon icon__like'} 
				onClick={(e) => {
					handleLikes(e);
				}}
			/>
			<span className={props.likes != 0 ? 'post__likeCounter--display' : 'post__likeCounter--hide'} id={`${props.postId}_likeCounter`}>{props.likes}</span>
		</div> 
	);
};

PostLike.propTypes = {
	postsList: PropTypes.array,
	postId: PropTypes.string,
	likes: PropTypes.number,
	setPostChanged: PropTypes.func,
};

export default PostLike;
