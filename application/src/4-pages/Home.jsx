import React, { useState, useEffect } from 'react';
import LoadPosts  from '../3-components/b-Posts/LoadPosts';
import NewPost from '../3-components/b-Posts/NewPost';

function Home() {
	const [postsList, setPostsList] = useState([]);

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

	return (
		<div className='home'>

			<section className='home__headPart'>
				<h1>Groupomania Bonjour</h1>
			</section>

			<section className='home__mainPart'>
				<div className="addPost__container">
					<NewPost />
				</div>
				<div className='post__container'>
					{postsList.map((post, index) => (
						<LoadPosts 
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
