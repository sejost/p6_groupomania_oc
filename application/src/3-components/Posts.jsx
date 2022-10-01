import React from 'react';
import PropTypes from 'prop-types';
import { TiThumbsOk } from 'react-icons/ti';



const Posts = ({title, author, date, postMessage, picture, likesCount}) => {
	return (
		<div className='post__wrapper'>
			<div className='post__headPart'>
				<h2 className='post__title'>{title}</h2>
				<h3 className='post__ownerId'>par {author}</h3>
				<span className='post__postDate'>le {date}</span>
			</div>
			<div className='post__mainPart'>
				<div className='post__postText'>{postMessage}</div>
				<div className='post__postImage__container'>
					<img className='post__postImage__content' src={picture} />
				</div>
			</div>
			<div className='post__footPart'>
				<TiThumbsOk size='30'className='post__likeIcon'/><span className='post__likeCounter'>{likesCount}</span>
			</div>
			<div className='post__commentPart'>
			</div>
		</div>

	);
};

export default Posts;