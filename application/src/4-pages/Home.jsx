import React from 'react';
import PostMain from '../3-components/b-Posts/i-PostMain';
import useAuth from '../1-hooks/useAuth';

function Home() {
	const { auth } = useAuth();
	
	return (
		<div className='home'>

			<section className='home__headPart'>
				<h1>Bonjour {auth.displayName}</h1>
			</section>

			<section className='home__mainPart'>
				<div className='post__container'>
					<PostMain />
				</div>
			</section>
		</div>
	);
}

export default Home;
