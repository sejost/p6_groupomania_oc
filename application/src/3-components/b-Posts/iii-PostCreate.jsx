import React, {useState} from 'react';
import useAuth from '../../1-hooks/useAuth';
const axios = require('axios');

export const PostCreate = () => {
	const { auth } = useAuth();
	const [upPicture, setUpPicture] = useState('none');
	const [postContent, setPostContent] = useState({
		title: '',
		author: '',
		message: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append('image', upPicture);
		data.append('authorName', auth.displayName);
		data.append('userId', auth.userId);
		data.append('postTitle', postContent.title);
		data.append('postText', postContent.message);
		try{
			await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API}post/create`,
				data,
				withCredentials : true,
			});
		}
		catch(error){
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input className='input--title post__title' 
				placeholder='Titre du post'
				type="text"
				id="titleContent"
				autoComplete="off"
				onChange={(e) => setPostContent({...postContent, title: e.target.value})}
				required
				aria-describedby="titre à remplir"
			/>
			<input className='input--message'
				placeholder=''
				type="text"
				id="messageContent"
				autoComplete="off"
				onChange={(e) => setPostContent({...postContent, message: e.target.value})}
				aria-describedby="titre à remplir"
			/>
			<input
				type="file"
				id="file-upload"
				name="file"
				accept=".jpg, .jpeg, .png"
				onChange={(e) => setUpPicture(e.target.files[0])}
			/>
			<button type='submit'>Envoyer</button> 
		</form>
	);
};