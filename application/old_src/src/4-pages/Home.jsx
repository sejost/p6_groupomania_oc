import React from 'react';
import { PostMain } from '../3-components/b-Posts/i-PostMain';
import { PostCreate } from '../3-components/b-Posts/iii-PostCreate';



function Home() {
	return (
		<div className='home'>

			<section className='home__headPart'>
				<h1>Groupomania Bonjour</h1>
			</section>

			<section className='home__mainPart'>
				<div className="addPost__container">
					<PostCreate />
				</div>
				<div className='post__container'>
					<PostMain />
				</div>
			</section>
		</div>
	);
}

export default Home;
