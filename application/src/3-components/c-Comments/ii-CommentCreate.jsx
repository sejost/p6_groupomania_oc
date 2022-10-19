/* -- Comments Create React --*/
import React, { useState, useEffect } from 'react';
import useAuth from '../../1-hooks/useAuth';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BiCommentAdd, BiSend } from 'react-icons/bi';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';

/* -- Comments Create Main Function  --*/
const CommentCreate = (props) => {
/* Here we need several states:
the ID of the post we are working on
The mandatory content of the desired comment
The current status of the comment
Comment information created for update*/
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
						<textarea className='comment--message'
							placeholder=''
							type="text"
							id="messageContentComment"
							autoComplete="off"
							value={commentContent.message}
							onChange={(e) => setCommentContent({...commentContent, message: e.target.value})}
							aria-describedby="texte à remplir"
						/>
						<div className='icon__tools__wrapper'>
							<MdOutlineSettingsBackupRestore onClick={() => {
								setCommentPending(false);
								setCommentContent({
									author: '',
									message: '',
								});}} className='icon icon__tools icon__cancel'/>
							<BiSend onClick={handleSubmit} type='submit' className='icon icon__tools icon__send'/>
						</div>

					</form>
					
				</>
			);
		}
	
		else{
			return(
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