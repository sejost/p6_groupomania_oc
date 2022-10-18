/* -- Main Post React --*/
/* --- Purpose : Compiling all Posts Component ---*/
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
		<>
			<div className="postCreate__wrapper">
				<PostCreate setPostChanged={setPostChanged} />
			</div>
			{postsList.map((post, index) => {
				return (
					<div className='post__wrapper' key={`${post._id}-${index}`}>
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
						
						{post.comments.map((comment) => {
							return (
								<div className='post__comment comment__wrapper' key={`${comment._id}-${index}`}>
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
						<div className='post__comment comment__iconCreation'>
							<CommentCreate  setPostChanged={setPostChanged}
								postId={post._id}
							/>
						</div>

					</div>

				);
			})}
		</>
	);
};

export default PostMain;