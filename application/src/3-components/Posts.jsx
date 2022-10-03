import React from 'react';
import PropTypes from 'prop-types';
import { TiThumbsOk } from 'react-icons/ti';



const Posts = ({title, author, date, postMessage, picture, likesCount}) => {
	//const receivedDate = new Date(date);
	function formatDate(date, format) {
		const map = {
			mm: date.getMonth() + 1,
			dd: date.getDate(),
			yy: date.getFullYear().toString(),
			hh: date.getHours(),
			mn: date.getMinutes(),
		};
		return format.replace(/mm|dd|yy|hh|mn/gi, matched => map[matched]);
	}
	const newDate = formatDate(new Date(date), 'dd/mm/yy à hh:mn');

	return (
		<div className='post__wrapper'>
			<div className='post__headPart'>
				<h2 className='post__title'>{title}</h2>
				<h3 className='post__ownerId'>par {author}</h3>
				<span className='post__postDate'>le {newDate}</span>
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

//add Proptypes

Posts.propTypes = {
	title: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	postMessage: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	likesCount: PropTypes.number.isRequired,
};