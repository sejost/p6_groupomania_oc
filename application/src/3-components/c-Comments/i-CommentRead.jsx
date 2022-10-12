import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../b-Posts/x-PostFunctions';
import useAuth from '../../1-hooks/useAuth';

const CommentRead = (props) => {
	const { auth } = useAuth();
	const [postId, setPostId] = useState('');
	const [changePending, setChangePending] = useState(false);
	const authId = auth.userId;

	return (
		<>		
			<div className="comment__headPart">
				<h4 className="comment__ownerId">Commentaire de {props.commenterName}</h4>
				<span className="comment__commentDate">le {props.commentDate}</span>
			</div>
			<div className="comment__maintPart">
				<div className="comment__commentText">{props.commentText}</div>
			</div>
		</>
	);
};

export default CommentRead;