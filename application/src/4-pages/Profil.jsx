import React, { useState } from 'react';
import { useContext } from 'react';
import useAuth from '../1-hooks/useAuth';

const Profil = () => {
	const { auth, setAuth } = useAuth();
	const [name, setName] = useState('');

	useContext(() => {
		
	}, [name]);

	const changeDisplayName = (e) => {
		e.preventDefault();

		const fetchDisplayName =  async () => {
			const settings = {
				method: 'PUT',
				headers: {accept: 'application/json',
					'Access-Control-Allow-Headers': true,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localho.st:3000/',
				},
				credentials: 'include',
				body: JSON.stringify({ 
					displayName : name,
					token : auth.token,
				}),
			};

			const response = await fetch(`${process.env.REACT_APP_API}user/${auth.userId}`, settings);
			const data = await response.json();
			console.log(data);
			console.log;
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
			</div>
			<div>

			</div>
		</section>
	);
};

export default Profil;