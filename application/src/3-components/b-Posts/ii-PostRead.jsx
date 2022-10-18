/* -- Post Read React --*/
import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import PostUpdate from './iv-PostUpdate';
import PostDelete from './v-PostDelete';

import { formatDate } from './x-PostFunctions';
import useAuth from '../../1-hooks/useAuth';

import { MdEditNote, MdOutlineSettingsBackupRestore } from 'react-icons/md';



/* -- Post Read Function --*/
const PostRead = (props) => {
	const { auth } = useAuth();
	const [postId, setPostId] = useState('');
	const [changePending, setChangePending] = useState(false);

	const [actualPicture, setActualPicture] = useState('');
	const [updatePicture, setUpdatePicture] = useState(actualPicture);

	const [postContent, setPostContent] = useState({
		title: '',
		message: '',
	});

	/* -- On useEffect --*/
	/* -- Get the postId from parent  --*/
	/* -- get the content from parent  --*/
	/* -- Refresh on change picture or when change is pending  --*/
	useEffect(() => {
		setPostId(props.postId);
		setPostContent({
			title: props.postTitle,
			message: props.postText
		});
		setActualPicture(props.postImage);
		props.setPostChanged(changePending);

	}, [updatePicture, changePending]);

	return(
		<>
			<div className='post__headPart'>
				{changePending == false && <h2 className='post__title'>{props.postTitle}</h2>}
				{changePending == true && <input className='input--title post__title'
					type="text"
					defaultValue={props.postTitle}
					autoComplete="off"
					onChange={(e) => setPostContent({...postContent, title: e.target.value})}
					required
					aria-describedby="titre à remplir"
				/>}
				<h3 className='post__ownerId'>par {props.authorName}</h3>
				<span className='post__postDate'>le {formatDate(props.postDate, 'dd/mm/yy à hh:mn')}</span>
			</div>

			<div className='post__mainPart'>
				{changePending == false && <div className='post__postText'>{props.postText}</div>}
				{changePending == true && <textarea className='textarea--message'
					type="text"
					defaultValue={props.postText}
					id="messageContent"
					autoComplete="off"					
					onChange={(e) => setPostContent({...postContent, message: e.target.value})}
					aria-describedby="titre à remplir"
				/>}

				<div className='post__postImage__container'>
					<img className='post__postImage__content' src={props.postImage} />
					{changePending == true && 
					<div className='postImage__update'>
						<span aria-label='Modifier Image'>Modifier l&apos;image :</span>
						<input
							type="file"
							id="file-upload"
							name="file"
							accept=".jpg, .jpeg, .png"
							onChange={(e) => setUpdatePicture(e.target.files[0])}
						/>
					</div>}
				</div>
				
				<div className='post__icon__container icon__container'>
					{changePending == false &&  ((auth.userId == props.authorId) || (auth.userId == process.env.REACT_APP_ID)) && 
					<MdEditNote aria-labelledby='Accéder à la modification du post' onClick={() => setChangePending(true)} className='icon icon__tools icon__edit'/>
					}
					{changePending == true && 
					<>
						<MdOutlineSettingsBackupRestore 
							onClick={() => {
								setPostContent({
									title: '',
									message: '',
								});
								setUpdatePicture(actualPicture);
								setChangePending(false);}}
							className='icon icon__tools icon__cancel'
						/>
						<PostUpdate 
							postId={postId}
							postContent={postContent}
							updatePicture={updatePicture}
							// setUpdatePicture={setUpdatePicture}
							setChangePending={setChangePending}
						/>
						<PostDelete 
							postId={postId}
							setChangePending={setChangePending}
						/>
					</>}
				</div>

			</div>
		</>
	);
};

export default PostRead;
				
PostRead.propTypes = {
	postId: PropTypes.string,
	postTitle: PropTypes.string,
	authorName: PropTypes.string,
	authorId: PropTypes.string,
	postDate: PropTypes.string,
	postImage: PropTypes.string,
	postText: PropTypes.string,
	setPostChanged: PropTypes.func,
};

