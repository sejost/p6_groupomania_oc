import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import CommentUpdate from './iii-CommentUpdate';
import CommentDelete from './iv-CommentDelete';
import useAuth from '../../1-hooks/useAuth';
import { MdEditNote, MdOutlineSettingsBackupRestore } from 'react-icons/md';
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
				<h3 className="comment__ownerId">Commentaire de {props.commenterName}</h3>
				<span className="comment__commentDate">le {formatDate(props.commentDate, 'dd/mm/yy à hh:mn')}</span>
			</div>
			<div className="comment__maintPart">
				{changePending == false && <div className="comment__commentText">{props.commentText}</div>}
				{changePending == true && <textarea className='comment--message'
					type="text"
					id="messageContentComment"
					defaultValue={props.commentText}
					autoComplete="off"
					onChange={(e) => setCommentContent({...commentContent, message: e.target.value})}
					aria-describedby="texte à remplir" />}
			</div>
			{changePending == false &&  ((auth.userId == props.commenterId) || (auth.userId == process.env.REACT_APP_ID)) && 
					<MdEditNote onClick={() => setChangePending(true)} className='icon icon__tools comment__iconEdit'/>
			}
			{changePending == true && 
				<div className='comment__iconEdit'>
					<MdOutlineSettingsBackupRestore onClick={() => {
						setCommentContent({message: '',});
						setChangePending(false);
					}} 
					className='icon icon__tools icon__cancel'/>
					
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
				</div>}
		</>
	);
};

export default CommentRead;

CommentRead.propTypes = {
	postId: PropTypes.string,
	commentId: PropTypes.string,
	commenterName: PropTypes.string,
	commenterId: PropTypes.string,
	commentText: PropTypes.string,
	commentDate: PropTypes.string,
	setPostChanged: PropTypes.func,
};
