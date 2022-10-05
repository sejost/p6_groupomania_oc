import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { TiThumbsOk } from 'react-icons/ti';

import useAuth from '../../1-hooks/useAuth';

import axios from 'axios';

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
		// data = new FormData();
		// data.append('userId', auth.userId);
		// await axios.post(
		// 	{
		// 		url: `${process.env.REACT_APP_API}post/create`,
		// 		data,
		// 		withCredentials : true,
		// 	}
		// );
		console.log(e.target);
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
							<h2 className='post__title'>{post.postTitle}</h2>
							<h3 className='post__ownerId'>par {post.authorName}</h3>
							<span className='post__postDate'>le {formatDate(post.postDate, 'dd/mm/yy à hh:mn')}</span>
						</div>
						<div className='post__mainPart'>
							<div className='post__postText'>{post.postText}</div>
							<div className='post__postImage__container'>
								<img className='post__postImage__content' src={post.postImage} />
							</div>
						</div>
						<div className='post__footPart'>
							<TiThumbsOk size='30'className='post__likeIcon' onClick={handleLikes}/><span className='post__likeCounter'>{post.likes}{post._id}</span> 
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

