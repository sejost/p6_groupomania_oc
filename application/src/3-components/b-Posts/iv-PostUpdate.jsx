import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../1-hooks/useAuth';


export const UpdateTitle = (props, {postContent, setPostContent}) => {
	
	return (
		<>
			<input className='input--title post__title'
				type="text"
				defaultValue={props.postTitle}
				autoComplete="off"
				onChange={(e) => setPostContent({...postContent, title: e.target.value})}
				required
				aria-describedby="titre à remplir"
			/>
		</>
	);
};

export const UpdateText = (props, {postContent, setPostContent}) => {

	return (
		<>
			<input className='input--message'
				type="text"
				defaultValue={props.postText}
				id="messageContent"
				autoComplete="off"
				onChange={(e) => setPostContent({...postContent, message: e.target.value})}
				aria-describedby="titre à remplir"
			/>
		</>
	);
};

export const UpdatePicture = ({ setUpPicture }) => {

	return(
		<>
			<input
				type="file"
				id="file-upload"
				name="file"
				accept=".jpg, .jpeg, .png"
				onChange={(e) => setUpPicture(e.target.files[0])}
			/>Modifier limage
		</>
	);
};

export const ActiveUpdateBtn = (props) => {


	return(
		<>
			<button 
				onClick={() => props.setChangePending(true)}>
					Modifier
			</button>
		</>

	);

};

export const CancelUpdateBtn = (props) => {
	return(
		<button
			onClick={() => props.setChangePending(false)}>
				Annuler Modification
		</button>
	);
};

export const SetUpdateBtn = (props) => {
	const { auth } = useAuth();
	const [upPicture, setUpPicture] = useState('none');
	const [postContent, setPostContent] = useState({
		title: '',
		message: '',
	});

	//<UpdateTitle setPostContent={setPostContent} />;

	const handleSetUpdate = async (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append('image', upPicture);
		data.append('userId', auth.userId);
		data.append('postTitle', postContent.title);
		data.append('postText', postContent.message);
		try{
			await axios({
				method: 'put',
				url: `${process.env.REACT_APP_API}post/update/${props.postId}`,
				data,
				withCredentials : true,
			});
		}
		catch(error){
			console.log(error);
		}
	};

	return(
		<button onClick={handleSetUpdate}>Valider modification</button>
	);

};