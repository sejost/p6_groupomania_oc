import React, { useState, useEffect }  from 'react';
import { TiThumbsOk } from 'react-icons/ti';
import { findUser, formatDate } from './x-PostFunctions';
import useAuth from '../../1-hooks/useAuth';


export const PostRead = (props) => {
	const [postModifying, setPostModifying] = useState(false);
	const { auth } = useAuth();

	return(
		<>
			<div className='post__headPart'>
				{postModifying == false && <h2 className='post__title' id={`${props.Postid}_postTitle`}>{props.postTitle}</h2>}
				{postModifying == true  && <input className='input--title post__title'
					type="text"
					defaultValue={props.postTitle}
					autoComplete="off"
					//onChange={(e) => setPostContent({...postContent, title: e.target.value})}
					required
					aria-describedby="titre à remplir"
				/>}
				<h3 className='post__ownerId'>par {props.authorName}</h3>
				<span className='post__postDate' id={`${props.postId}_postDate`}>le {formatDate(props.postDate, 'dd/mm/yy à hh:mn')}</span>
			</div>
			<div className='post__mainPart'>
				{postModifying == false &&<div className='post__postText' id={`${props.postId}_postText`}>{props.postText}</div>}
				{postModifying == true && <input className='input--message'
					type="text"
					defaultValue={props.postText}
					id="messageContent"
					autoComplete="off"
					//onChange={(e) => setPostContent({...postContent, message: e.target.value})}
					aria-describedby="titre à remplir"
				/>}
				<div className='post__postImage__container'>
					<img className='post__postImage__content' id={`${props._id}_postImage`}src={props.postImage} />
				</div>
				{/* {auth.userId == post.authorId && <button onClick={() => setPostModifying(!postModifying)}>Modifier</button>} */}
				{/*auth.userId == props.authorId && <button id={`${props.postId}_btnPostModif`} onClick={(e) => handleModification(e)}>Modifier</button>*/}
			</div>
			<div className='post__footPart'>
				<TiThumbsOk 
					size='30'
					//className={findUser(postsList, props.podId, auth.userId) ? 'post__isLikedIcon' :  'post__likeIcon'} 
					id={`${props.postId}_likeIcon`} 
					onClick={(e) => {
						handleLikes(e);
					}}
				/>
				<span className='post__likeCounter' id={`${props.postId}_likeCounter`}>{props.likes}</span> 
			</div>
			<div className='post__commentPart'>
							Commentaires !
			</div>
		</>
	);
};
