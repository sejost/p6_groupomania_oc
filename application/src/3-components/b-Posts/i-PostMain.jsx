import React, { useState, useEffect }  from 'react';
import useAuth from '../../1-hooks/useAuth';
import { PostRead } from './ii-PostRead';
import { PostLike } from './vi-PostLike';

const axios = require('axios');

export const PostMain = () => {
	const [postsList, setPostsList] = useState([]);
	const [postChanged, setPostChanged] = useState([]);	

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

	return(
		<div>
			{postsList.map((post, index) => {
				return (
					<div className='post__wrapper' key={`${post.id}-${index}`}>
						<PostRead setPostChanged={setPostChanged}
						// Left part : idname from the children, 
						// Right part :  postsList.map(post, index)
							postsList={postsList}
							postId={post._id}
							postTitle={post.postTitle}
							authorId={post.authorId}
							authorName={post.authorName}
							postDate={post.postDate}
							postText={post.postText}
							postImage={post.postImage}
							likes={post.likes}
						/>
						<PostLike setPostChanged={setPostChanged}
							postsList={postsList}
							postId={post._id}
							likes={post.likes}
						/>
					</div>
				);
			})};
		</div>
	);
};

