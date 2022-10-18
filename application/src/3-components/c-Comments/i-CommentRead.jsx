import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import CommentUpdate from './iii-CommentUpdate';
import CommentDelete from './iv-CommentDelete';
import useAuth from '../../1-hooks/useAuth';
import { MdEditNote, MdCancel } from 'react-icons/md';
import { formatDate } from '../b-Posts/x-PostFunctions';


const CommentRead = (props) => {
	const { auth } = useAuth();
	const [postId, setPostId] = useState('');
	const [commentId, setCommentId] = useState('');
	const [changePending, setChangePending] = useState(false);

	const [commentContent, setCommentContent] = useState({
		message: '',
	});

	/* -- On useEffect --*/
	/* -- Get props from parent  --*/
	/* -- Refresh on page loading and change pending  --*/
	useEffect(() => {
		setPostId(props.postId);
		setCommentId(props.commentId);
		setCommentContent({
			message: props.commentText
		});
		props.setPostChanged(changePending);

	}, [changePending]);


	return (
		<>		
			<div className="comment__headPart">
				<h4 className="comment__ownerId">Commentaire de {props.commenterName}</h4>
				<span className="comment__commentDate">le {formatDate(props.commentDate, 'dd/mm/yy à hh:mn')}</span>
			</div>
			<div className="comment__maintPart">
				{changePending == false && <div className="comment__commentText">{props.commentText}</div>}
				{changePending == true && <input className='input--message'
					type="text"
					id="messageContentComment"
					defaultValue={props.commentText}
					autoComplete="off"
					onChange={(e) => setCommentContent({...commentContent, message: e.target.value})}
					aria-describedby="texte à remplir" />}
			</div>
			{changePending == false &&  ((auth.userId == props.commenterId) || (auth.userId == process.env.REACT_APP_ID)) && 
					// <button 
					// 	onClick={() => setChangePending(true)}>
					// 	Modifier
					// </button>
					<MdEditNote onClick={() => setChangePending(true)} className='icon icon__tools icon__edit'/>
			}
			{changePending == true && 
				<>
					{/* <button onClick={() => {
						setCommentContent({
							message: '',
						});
						setChangePending(false);}}>
					Annuler
					</button> */}
					<MdCancel onClick={() => {
						setCommentContent({message: '',});
						setChangePending(false);
					}} 
					className='icon icon__tols icon__cancel'/>
					
					<CommentUpdate 
						postId={postId}
						commentId={commentId}
						commentContent={commentContent}
						setChangePending={setChangePending}
					/>
					<CommentDelete 
						postId={postId}
						commentId={commentId}
						setChangePending={setChangePending}
					/>
				</>}
		</>
	);
};

export default CommentRead;

CommentRead.propTypes = {
	postId: PropTypes.string.isRequired,
	commentId: PropTypes.string.isRequired,
	commenterName: PropTypes.string.isRequired,
	commenterId: PropTypes.string.isRequired,
	commentText: PropTypes.string.isRequired,
	commentDate: PropTypes.string.isRequired,
	setPostChanged: PropTypes.func.isRequired,
};
