import React, { useState, useEffect } from 'react';
import useAuth from '../../1-hooks/useAuth';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BiCommentAdd } from 'react-icons/bi';


const CommentCreate = (props) => {
	const { auth } = useAuth();
	const [postId, setPostId] = useState('');
	const [commentContent, setCommentContent] = useState({
		author: '',
		message: '',
	});
	const [commentPending, setCommentPending] = useState(false);
	const [commentCreated, setCommentCreated] = useState('');

	useEffect(() => {
		setPostId(props.postId);
		props.setPostChanged(commentPending);
	}, [commentCreated]);

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		try{
			let response = await axios({
				method: 'put',
				url: `${process.env.REACT_APP_API}comment/create/${postId}`,
				data : { 
					commenterId : auth.userId,
					commenterName : auth.displayName,
					commentText : commentContent.message
				},
				withCredentials : true,
			});
			setCommentCreated(response.data);
			setCommentContent({
				author: '',
				message: '',
			});
		}
		catch(error){
			alert(error);
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
				//<button onClick={() => {setCommentPending(true);}}>Commenter la publication</button>
				<BiCommentAdd onClick={() => {setCommentPending(true);}} className='icon icon__tools icon__addComment'/>
			);
		}
	}
};

export default CommentCreate;

CommentCreate.propTypes = {
	postId: PropTypes.string.isRequired,
	setPostChanged: PropTypes.func.isRequired,
};