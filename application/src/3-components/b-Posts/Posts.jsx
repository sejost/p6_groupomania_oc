import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { TiThumbsOk } from 'react-icons/ti';

import useAuth from '../../1-hooks/useAuth';

const axios = require('axios');

const LoadPosts = () => {
	const [postsList, setPostsList] = useState([]);
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
	},[]);

	const handleLikes = async (e) => {
		e.preventDefault();
		const postId = (e.target.id).split('_')[0];
		//const response = await axios({
		await axios({
			method: 'post',
			url: `${process.env.REACT_APP_API}post/like`,
			data : {
				postId : postId,
				userId: auth.userId,
			},
			withCredentials : true,
		});
		try {
			console.log('coucou');
		//	console.log(postsList);
		}
		catch(error){
			console.error(error);
		}
	};

	const formatDate = (givenDate, format) => {
		const date = new Date(givenDate);
		const map = {
			mm: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
			dd: date.getDate() <10 ? `0${date.getDate()}` : date.getDate(),
			yy: date.getFullYear().toString(),
			hh: date.getHours() <10 ? `0${date.getHours()}` : date.getHours(),
			mn: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
		};
		return format.replace(/mm|dd|yy|hh|mn/gi, matched => map[matched]);
	};

	return(
		<div>
			{postsList.map((post, index) => {
				return (
					<div className='post__wrapper' key={`${post.id}-${index}`}>
						<div className='post__headPart'>
							<h2 className='post__title' id={`${post._id}_postTitle`}>{post.postTitle}</h2>
							<h3 className='post__ownerId'>par {post.authorName}</h3>
							<span className='post__postDate' id={`${post._id}_postDate`}>le {formatDate(post.postDate, 'dd/mm/yy à hh:mn')}</span>
						</div>
						<div className='post__mainPart'>
							<div className='post__postText' id={`${post._id}_postText`}>{post.postText}</div>
							<div className='post__postImage__container'>
								<img className='post__postImage__content' id={`${post._id}_postImage`}src={post.postImage} />
							</div>
						</div>
						<div className='post__footPart'>
							<TiThumbsOk size='30'className='post__likeIcon' id={`${post._id}_likeIcon`} onClick={handleLikes}/><span className='post__likeCounter' id={`${post._id}_likeCounter`}>{post.likes}</span> 
						</div>
						<div className='post__commentPart'>
							Commentaires !
						</div>
					</div>
				);
			})};
		</div>
	);
};

LoadPosts.propTypes = {
	postId: PropTypes.string,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	postMessage: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	likesCount: PropTypes.number.isRequired,
};

export default LoadPosts;

