import React, { useState } from 'react';
import useAuth from '../1-hooks/useAuth';
import Cookies from 'js-cookie';

const Profil = () => {
	const { auth, setAuth } = useAuth();
	const [name, setName] = useState('');
	const token = Cookies.get('token');

	const changeDisplayName = (e) => {
		e.preventDefault();

		const fetchDisplayName =  async () => {
			const settings = {
				method: 'PUT',
				headers: {ccept: 'application/json',
					'Access-Control-Allow-Headers': true,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localho.st:3000/',
				},
				credentials: 'include',
				body: JSON.stringify({ displayName : name }),
			};

			const response = await fetch(`${process.env.REACT_APP_API}user/${auth.userId}`, settings);
			const data = await response.json();
			console.log(data);
		};
		fetchDisplayName();
	};

	return (
		<section>
			<div>
				<h1>Profil de {auth.displayName}</h1>
				<form onSubmit={changeDisplayName}>
					<label htmlFor="changeName">
						<input
							placeholder='Pseudonyme'
							type='text'
							id='changeName'
							autoComplete='off'
							onChange={(e) => setName(e.target.value)}
							value={name}
							required
							aria-describedby="displayNameNote"
						/>
					</label>
					<button type="submit" disabled={!name}>
                        Envoyer
					</button>
				</form>
				{/* <button onClick={changeDisplayName}>Changer votre nom</button> */}
			</div>
			<div>

			</div>
		</section>
	);
};

export default Profil;