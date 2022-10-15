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
	const [commentPending, setCommentPending] = useState(false);

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
			setCommentContent({
				author: '',
				message: '',
			});
		}
		catch(error){
			console.log(error);
		}
	};

	{
		if (commentPending==true){
			return (
				<>
					<form onSubmit={handleSubmit}>
						<input className='input--message'
							placeholder=''
							type="text"
							id="messageContentComment"
							autoComplete="off"
							value={commentContent.message}
							onChange={(e) => setCommentContent({...commentContent, message: e.target.value})}
							aria-describedby="texte à remplir"
						/>
						<button type='submit'>Envoyer</button> 
					</form>
					<button onClick={() => {
						setCommentPending(false);
						setCommentContent({
							author: '',
							message: '',
						});}}>
							Annuler</button>
				</>
			);
		}
	
		else{
			return(
				<button onClick={() => {setCommentPending(true);}}>Commenter la publication</button>
			);
		}
	}
};

export default CommentCreate;