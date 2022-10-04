import React, {useState} from 'react';
import useAuth from '../../1-hooks/useAuth';
const axios = require('axios');
//import UploadFiles from './UploadFiles';



const NewPost = () => {
	const { auth } = useAuth();
	const [upPicture, setUpPicture] = useState(null);
	const [postContent, setPostContent] = useState({
		title: '',
		author: '',
		message: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		//setPostContent.picture(upPicture);
		const formData = new FormData();
		formData.append('picture', upPicture);
		try{
			console.log('authorName :', auth.displayName);
			console.log('authorId :', auth.userId);
			console.log(postContent.title);
			console.log(postContent.message);
			console.log(formData);

			await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API}post/create`,
				//formData,
				data: {
					authorName : auth.displayName,
					userId : auth.userId,
					postTitle : postContent.title,
					postText : postContent.message,
					//postImage : ''
				}, 
				withCredentials : true,
				'Content-type' : 'multipart/form-data'
			});
		}
		catch(error){
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input className='input--title'
				placeholder='Titre du post'
				type="text"
				id="titleContent"
				autoComplete="off"
				onChange={(e) => setPostContent({...postContent, title: e.target.value})}
				//value={postContent({title})}
				required
				aria-describedby="titre à remplir"
			/>
			<input className='input--message'
				placeholder=''
				type="text"
				id="messageContent"
				autoComplete="off"
				onChange={(e) => setPostContent({...postContent, message: e.target.value})}
				//value={postContent({message})}
				aria-describedby="titre à remplir"
			/>
			<input
				type="file"
				id="file-upload"
				name="file"
				accept=".jpg, .jpeg, .png"
				//onChange={(e) => setPostContent({...postContent, picture: e.target.value})}
				onChange={(e) => setUpPicture(e.target.files[0])}
			/>
			<button type='submit'>Envoyer</button> 
		</form>
	);
};

export default NewPost;