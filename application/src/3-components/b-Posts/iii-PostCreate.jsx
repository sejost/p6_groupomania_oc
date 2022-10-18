import React, {useState} from 'react';
import useAuth from '../../1-hooks/useAuth';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BiSend } from 'react-icons/bi';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';

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
			alert(error);
		}
	};
	

	if(creationPending == true){
		return (
			<> 
				<form onSubmit={handleSubmit}>
					<h2>Nouvelle publication : </h2>
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
					<textarea className='input--message'
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
					<BiSend onClick={handleSubmit} type='submit' className='icon icon__tools icon__send'/>
					<MdOutlineSettingsBackupRestore className='icon icon__tools icon__cancel' onClick={()=>{
						setCreationPending(false);
						setUpPicture('none');
						setPostContent({
							title: '',
							author: '',
							message: '',
						});
						
					}} />
				</form>
				
			</>
		);
	}
	return(
		<button onClick={() => {setCreationPending(true);}}>Publier</button>
	);
};

export default PostCreate;

PostCreate.propTypes = {
	setPostChanged: PropTypes.func.isRequired,
};
