import React from 'react';
import useAuth from '../1-hooks/useAuth';

const Profil = () => {
	const { auth, setAuth } = useAuth();

	const changeDisplayName = (e) => {
		e.preventDefault();

		console.log(auth);
	};

	return (
		<section>
			<div>
				<h1>Profil of {auth.displayName}</h1>
				<button onClick={changeDisplayName}>Changer votre nom</button>
			</div>
			<div>

			</div>
		</section>
	);
};

export default Profil;