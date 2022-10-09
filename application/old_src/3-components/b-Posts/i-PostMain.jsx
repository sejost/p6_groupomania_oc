import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { TiThumbsOk } from 'react-icons/ti';
import { findUser, formatDate } from './x-PostFunctions';
import useAuth from '../../1-hooks/useAuth';
import { PostRead } from './ii-PostRead';

const axios = require('axios');

export const PostMain = () => {
	const [postsList, setPostsList] = useState([]);
	const [postId, setPostId] = useState('');
	const [postChanged, setPostChanged] = useState([]);
	const { auth } = useAuth();
	

	useEffect( () =>  {
		const getPosts = async () => {
			const response = await axios({
				method: 'get',
				url : `${process.env.REACT_APP_API}post/`,
				withCredentials : true,
			});
			setPostsList(response.data);
		};
		getPosts();	

	},[postChanged]);

	const handlePostId = async (e) => {
		setPostId((e.target.id).split('_')[0]);
	}; 

	const handleLikes = async (e) => {
		e.preventDefault();
		await handlePostId(e);
		console.log('réponse :', postId);
		let response = await axios({
			method: 'post',
			url: `${process.env.REACT_APP_API}post/like/${postId}`,
			data : {userId: auth.userId},
			withCredentials : true,
		});
		try {
			setPostChanged(response.data);
		}
		catch(error){
			console.error(error);
		}
	};

	return(
		<div>
			{postsList.map((post, index) => {
				console.log(postsList);
				return (
					<div className='post__wrapper' key={`${post.id}-${index}`}>
						<PostRead 
							postId={post._id}
							postTitle={post.postTitle}
							authorName={post.authorName}
							postDate={post.postDate}
							postText={post.postText}
							postImage={post.postImage}
							likes={post.likes}
						/>
					</div>
				);
			})};
		</div>
	);
};

PostMain.propTypes = {
	postId: PropTypes.string,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	postMessage: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	likesCount: PropTypes.number.isRequired,
};


