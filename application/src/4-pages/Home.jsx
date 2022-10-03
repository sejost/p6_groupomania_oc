import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Posts  from '../3-components/Posts';
import useAuth from '../1-hooks/useAuth';


function Home() {
	const [postsList, setPostsList] = useState([]);
	const [postContent, setPostContent] = useState({
		title: '',
		author: '',
		message: '',
		picture: ''
	});

	const { auth, setAuth } = useAuth();


	useEffect(() => {
		const fetchPost = async() => {

			const settings = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Access-Control-Allow-Headers': true,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localho.st:3000/',
				},
				credentials: 'include',
			};
			try{
				const response = await fetch(`${process.env.REACT_APP_API}post/`, settings);
				const postsList = await response.json();
				setPostsList(postsList);
			}
			catch(error){
				console.log(error);
			}

		};
		fetchPost();
	},[]);
	
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
		<div className='home'>

			<section className='home__headPart'>
				<h1>Groupomania Bonjour</h1>
			</section>

			<section className='home__mainPart'>

				<div className="addPost__container">
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
							aria-describedby="titre à rempl"
						/>
						<button type='subit'>Envoyer</button>
					</form>
				</div>

				<div className='post__container'>
					{postsList.map((post, index) => (
						<Posts 
							key={`${post.id}-${index}`}
							title={post.postTitle}
							author={post.authorName}
							date={post.postDate}
							postMessage={post.postText}
							picture={post.postImage}
							likesCount={post.likes}
						/>
					))}
				</div>

			</section>
		</div>
	);
}

export default Home;
