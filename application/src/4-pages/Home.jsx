//import axios from 'axios';
import React from 'react';
import Posts  from '../3-components/b-Posts/Posts';
import NewPost from '../3-components/b-Posts/NewPost';


function Home() {
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
					<Posts />
				</div>
			</section>
		</div>
	);
}

export default Home;
