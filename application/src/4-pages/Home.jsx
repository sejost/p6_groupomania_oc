import React from 'react';
import useAuth from '../1-hooks/useAuth';


function Home() {
	const { auth, setAuth } = useAuth();

	const addPost = () => {
		console.log(auth);
	};
	return (
		<div className='home'>
			<section className='home__headpart'>
				<h1>Groupomania Bonjour</h1>
				<button type="button" onClick={addPost}>
                    Ajoutez un post
				</button>
			</section>
			<section className='home_corepart'>
				<div className='post'>
					<h2 className='post--title'>Titre du post</h2>
					
				</div>
			</section>
		</div>
	);
}

export default Home;
