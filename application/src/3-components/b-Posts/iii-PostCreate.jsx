import React, {useState} from 'react';
import useAuth from '../../1-hooks/useAuth';
import axios from 'axios';
import PropTypes from 'prop-types';

const PostCreate = (props) => {
	const { auth } = useAuth();
	const [upPicture, setUpPicture] = useState('none');
	const [postContent, setPostContent] = useState({
		title: '',
		author: '',
		message: '',
	});
	const [creationPending, setCreationPending] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let data = new FormData();
		console.log(upPicture);
		data.append('image', upPicture);
		data.append('authorName', auth.displayName);
		data.append('userId', auth.userId);
		data.append('postTitle', postContent.title);
		data.append('postText', postContent.message);
		try{
			let response = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API}post/create`,
				data,
				withCredentials : true,
			});
			setUpPicture('none');
			setPostContent({
				title: '',
				author: '',
				message: '',
			});
			props.setPostChanged(response.data);
		}
		catch(error){
			console.log(error);
		}
	};
	

	if(creationPending == true){
		return (
			<>
				<form onSubmit={handleSubmit}>
					<input className='input--title post__title' 
						placeholder='Titre du post'
						type="text"
						id="titleContent"
						autoComplete="off"
						value={postContent.title}
						onChange={(e) => setPostContent({...postContent, title: e.target.value})}
						required
						aria-describedby="titre à remplir"
					/>
					<input className='input--message'
						placeholder=''
						type="text"
						id="messageContent"
						autoComplete="off"
						value={postContent.message}
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
				<button onClick={()=>{
					setCreationPending(false);
					setUpPicture('none');
					setPostContent({
						title: '',
						author: '',
						message: '',
					});
				}}>Annuler</button>
			</>
		);
	}
	return(
		<button onClick={() => {setCreationPending(true);}}>Créer une nouvelle publication</button>
	);
};

export default PostCreate;

PostCreate.propTypes = {
	setPostChanged: PropTypes.bool.isRequired,
};
