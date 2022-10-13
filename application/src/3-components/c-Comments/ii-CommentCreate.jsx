import React, { useState, useEffect } from 'react';
import useAuth from '../../1-hooks/useAuth';
const axios = require('axios');

const CommentCreate = (props) => {
	const { auth } = useAuth();
	const [postId, setPostId] = useState('');
	const [commentContent, setCommentContent] = useState({
		author: '',
		message: '',
	});

	useEffect(() => {
		setPostId(props.postId);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		try{
			await axios({
				method: 'put',
				url: `${process.env.REACT_APP_API}comment/create/${postId}`,
				data : { 
					commenterId : auth.userId,
					commenterName : auth.displayName,
					commentText : commentContent.message
				},
				withCredentials : true,
			});
		}
		catch(error){
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<span>Commenter cette publication : </span>
			<input className='input--message'
				placeholder=''
				type="text"
				id="messageContentComment"
				autoComplete="off"
				onChange={(e) => setCommentContent({...commentContent, message: e.target.value})}
				aria-describedby="titre à remplir"
			/>
			<button type='submit'>Envoyer</button> 
		</form>
	);
};

export default CommentCreate;