import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';

import { UpdateTitle, UpdateText, UpdatePicture, ActiveUpdateBtn, CancelUpdateBtn, SetUpdateBtn } from './iv-PostUpdate';
import { formatDate } from './x-PostFunctions';
import useAuth from '../../1-hooks/useAuth';


export const PostRead = (props) => {
	const { auth } = useAuth();
	const [postId, setPostId] = useState('');
	const [changePending, setChangePending] = useState(false);
	const authId = auth.userId;

	useEffect(() => {
		setPostId(props.postId);
	}, []);

	return(
		<>
			<div className='post__headPart'>
				{changePending == false && <h2 className='post__title' id={`${postId}_postTitle`}>{props.postTitle}</h2>}
				{changePending == true && <UpdateTitle postTitle={props.postTitle} />}
				<h3 className='post__ownerId'>par {props.authorName}</h3>
				<span className='post__postDate' id={`${postId}_CoucoupostDate`}>le {formatDate(props.postDate, 'dd/mm/yy à hh:mn')}</span>
			</div>
			<div className='post__mainPart'>
				{changePending == false && <div className='post__postText' id={`${postId}_postText`}>{props.postText}</div>}
				{changePending == true && <UpdateText postText={props.postText} />}
				<div className='post__postImage__container'>
					<img className='post__postImage__content' id={`${postId}_postImage`}src={props.postImage} />
					{changePending == true && <UpdatePicture />}
				</div>
				{changePending == false &&  ((auth.userId == props.authorId) || (auth.userId == process.env.REACT_APP_ID)) && <ActiveUpdateBtn 
					authorId={props.authorId} 
					setChangePending={setChangePending} />}
				{changePending == true && 
					<>
						<CancelUpdateBtn setChangePending={setChangePending} /> <SetUpdateBtn postId={postId}/>
					</>
				}
			</div>
		</>
	);
};
				
PostRead.propTypes = {
	postsList: PropTypes.array,
	postId: PropTypes.string,
	postTitle: PropTypes.string,
	authorName: PropTypes.string,
	authorId: PropTypes.string,
	postDate: PropTypes.string,
	postImage: PropTypes.string,
	postText: PropTypes.string,
	likes: PropTypes.number,
};

//{postModifying == true  && <UpdateTitle postTitle={props.postTitle} />}
//{postModifying == true && <UpdateText postText={props.postText}/>}
