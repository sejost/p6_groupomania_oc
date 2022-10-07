import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import ModifyPost from './ModifyPost';
import { TiThumbsOk } from 'react-icons/ti';
import { findUser } from './postsFunctions';
import { formatDate } from './postsFunctions';
import useAuth from '../../1-hooks/useAuth';



const axios = require('axios');

const LoadPosts = () => {
	const [postsList, setPostsList] = useState([]);
	const [postId, setPostId] = useState('');
	const [postChanged, setPostChanged] = useState([]);
	// const [postModifying, setPostModifying] = useState({
	// 	status : false, 
	// 	postId : ''
	// });
	const [postModifying, setPostModifying] = useState(false);
	const { auth } = useAuth();
	

	useEffect( () =>  {
		const getPosts = async () => {
			const response = await axios({
				method: 'get',
				url : `${process.env.REACT_APP_API}post/`,
				withCredentials : true,
			});
			setPostsList(response.data);
		};
		getPosts();	

	},[postChanged]);

	const handlePostId = async (e) => {
		setPostId((e.target.id).split('_')[0]);
	}; 

	const handleLikes = async (e) => {
		e.preventDefault();
		await handlePostId(e);
		console.log('réponse :', postId);
		let response = await axios({
			method: 'post',
			url: `${process.env.REACT_APP_API}post/like/${postId}`,
			data : {userId: auth.userId},
			withCredentials : true,
		});
		try {
			setPostChanged(response.data);
		}
		catch(error){
			console.error(error);
		}
	};

	const handleModification = async (e) => {
		e.preventDefault();
		// setPostModifying({status : !postModifying.status, postId : handlePostId(e)});
		// console.log(postModifying.postId);
		// postModifying.postId == '633e5c45ce0e600dc05fbf1d' ? console.log('true') : console.log('false');
		// setPostModifying({status : !postModifying.status});
		// setPostModifying.postId(await handlePostId(e));
		handlePostId(e);
		console.log(postId);
		setPostModifying(!postModifying);
	};


	
	return(
		<div>
			{postsList.map((post, index) => {
				return (
					<div className='post__wrapper' key={`${post.id}-${index}`}>
						<div className='post__headPart'>

							{postModifying == false && <h2 className='post__title' id={`${post._id}_postTitle`}>{post.postTitle}</h2>}
							{postModifying == true  && <input className='input--title post__title'
								type="text"
								defaultValue={post.postTitle}
								autoComplete="off"
								onChange={(e) => setPostContent({...postContent, title: e.target.value})}
								required
								aria-describedby="titre à remplir"
							/>}

							<h3 className='post__ownerId'>par {post.authorName}</h3>
							<span className='post__postDate' id={`${post._id}_postDate`}>le {formatDate(post.postDate, 'dd/mm/yy à hh:mn')}</span>
						</div>
						<div className='post__mainPart'>
							{postModifying == false &&<div className='post__postText' id={`${post._id}_postText`}>{post.postText}</div>}
							{postModifying == true && <input className='input--message'
								type="text"
								defaultValue={post.postText}
								id="messageContent"
								autoComplete="off"
								onChange={(e) => setPostContent({...postContent, message: e.target.value})}
								aria-describedby="titre à remplir"
							/>}
							<div className='post__postImage__container'>
								<img className='post__postImage__content' id={`${post._id}_postImage`}src={post.postImage} />
							</div>
							{/* {auth.userId == post.authorId && <button onClick={() => setPostModifying(!postModifying)}>Modifier</button>} */}
							{auth.userId == post.authorId && <button id={`${post._id}_btnPostModif`} onClick={(e) => handleModification(e)}>Modifier</button>}

						</div>
						<div className='post__footPart'>
							<TiThumbsOk 
								size='30'
								className={findUser(postsList, post._id, auth.userId) ? 'post__isLikedIcon' :  'post__likeIcon'} 
								id={`${post._id}_likeIcon`} 
								onClick={(e) => {
									handleLikes(e);
								}}
							/>
							<span className='post__likeCounter' id={`${post._id}_likeCounter`}>{post.likes}</span> 
							

						</div>
						<div className='post__commentPart'>
							Commentaires !
						</div>
					</div>
				);
			})};
		</div>
	);
};

LoadPosts.propTypes = {
	postId: PropTypes.string,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	postMessage: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	likesCount: PropTypes.number.isRequired,
};

export default LoadPosts;

