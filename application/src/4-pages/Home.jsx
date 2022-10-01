import React, { useState } from 'react';
import useAuth from '../1-hooks/useAuth';
const imageTest = require('../6-styles/5-images/basic-logo.jpg');
import { useEffect } from 'react';
import Posts from '../3-components/Posts';

function Home() {
	const { auth } = useAuth();
	const [postsList, setPostsList] = useState([]);

	const addPost = () => {
		console.log(auth);
	};

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
				//const data = await response.json();
				console.log('response :', response);
				//console.log('data :', data);
				const postsList = await response.json();
				console.log('postlist : ', {postsList});
				setPostsList(postsList);
			}
			catch(error){
				console.log(error);
			}

		};
		fetchPost();
	},[]);
	


	return (
		<div className='home'>
			<section className='home__headPart'>
				<h1>Groupomania Bonjour</h1>
				<button type="button" onClick={addPost}>
                    Ajoutez un post
				</button>
			</section>
			<section className='home__mainPart'>
				<div className='post__container'>
					<div className='post__wrapper'>
						<div className='post__headPart'>
							<h2 className='post__title'>Titre du post</h2>
							<h3 className='post__ownerId'>par Machin</h3>
							<span className='post__postDate'>le 23 Juillet</span>
						</div>
						<div className='post__mainPart'>
							<div className='post__postText'>Hey salut tout le monde, voici le post de test ! Trop génial !</div>
							<div className='post__postImage__container'>
								<img className='post__postImage__content' src={imageTest} />
							</div>
						</div>
						<div className='post__footPart'>
							{/* <TiThumbsOk size='30'className='post__likeIcon'/><span className='post__likeCounter'>0</span> */}
						</div>
						<div className='post__commentPart'>
						</div>
					</div>
				</div>

				<div className='post__container'>
					{postsList.map((post, index) => (
						<Posts 
							key={`${post.id}-${index}`}
							title={post.title}
							author={post.ownerName}
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
