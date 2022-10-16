/* -- Main Post React --*/
import React, { useState, useEffect }  from 'react';
import PostCreate from './iii-PostCreate';
import PostRead from './ii-PostRead';
import PostLike from './vi-PostLike';
import CommentRead from '../c-Comments/i-CommentRead';
import CommentCreate from '../c-Comments/ii-CommentCreate';

const axios = require('axios');

const PostMain = () => {
	const [postsList, setPostsList] = useState([]);
	const [postChanged, setPostChanged] = useState([]);	

	/* -- Refresh Page on useEffect --*/
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

	/* -- Rendering --*/
	return(
		<div>
			<div className="postCreate__wrapper">
				<PostCreate setPostChanged={setPostChanged} />
			</div>
			{postsList.map((post) => {
				return (
					<div className='post__wrapper' key={`${post.id}`}>
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

						<CommentCreate  setPostChanged={setPostChanged}
							postId={post._id}
						/>
						
						{post.comments.map((comment) => {
							return (
								<div className='comment__wrapper' key={`${comment.id}`}>
									<CommentRead setPostChanged={setPostChanged}
										postsList={postsList}
										postId={post._id}
										commentId={comment._id}

										commenterId={comment.commenterId}
										commenterName={comment.commenterName}
										commentDate={comment.commentDate}
										commentText={comment.commentText}
									/>
								</div>
							);
						})
						}

					</div>

				);
			})}
		</div>
	);
};

export default PostMain;