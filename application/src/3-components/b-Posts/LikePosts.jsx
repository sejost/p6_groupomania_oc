import React from 'react';
import { TiThumbsOk } from 'react-icons/ti';

const LikePosts = (likes) => {
	return (
		<>
			<TiThumbsOk size='30'className='post__likeIcon'/><span className='post__likeCounter'>{likes}</span>
		</>
	);
};

export default LikePosts;