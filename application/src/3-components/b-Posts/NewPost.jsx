import React, {useState} from 'react';
import useAuth from '../../1-hooks/useAuth';
import UploadFiles from './UploadFiles';



const NewPost = () => {
	const { auth } = useAuth();
	const [postContent, setPostContent] = useState({
		title: '',
		author: '',
		message: '',
		picture: ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Headers': true,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
			},
			body: JSON.stringify({
				userId : auth.userId,
				authorName : auth.displayName,
				postTitle : postContent.title, 
				postText : postContent.message,
				picture : postContent.picture
			}),
			credentials: 'include',
		};
		try{
			console.log(settings.body);
			const response = await fetch(`${process.env.REACT_APP_API}post/create`, settings);
			console.log(response);
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
			<UploadFiles />
			{/* <label>
							Envoyer un fichier
				<input type="file"
				/>
			</label>
			<button type='submit'>Envoyer</button> */}
		</form>
	);
};

export default NewPost;