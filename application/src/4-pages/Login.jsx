import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, json } from 'react-router-dom';
import useAuth from '../1-hooks/useAuth';
import Register from '../3-components/a-Logs/Register';
import logo from '../6-styles/5-images/icon-left-font.svg';
import Cookies from 'js-cookie';
/* -- -- -- -- */

/* -- Login Function -- */
function Login() {
	/* -- UseState, UseRef & UseEffect Declaration-- */
	const { auth, setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	// const [success, setSuccess] = useState(false);

	const [signUpModal, setSignUpModal] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
	}, []);
	/* -- -- -- --*/

	/* -- Function on Handle Submit Form -- */
	const handleSubmit = async (e) => {
		e.preventDefault();

		const settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Headers': true,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localho.st:3000/',
			},
			//withCredentials: true,
			credentials: 'include',
			body: JSON.stringify({ email, password }),
		};
		const response = await fetch(`${process.env.REACT_APP_API}auth/login`, settings);
		const jsonData = await response.json();
		
		try {
			const token = jsonData.token;
			const userId = jsonData.userId;
			const displayName = jsonData.displayName;
			if (!token || !userId){
				setErrMsg('Authentification incorrect');
			}
			else {
				setAuth({token, userId, displayName});
			}
			navigate(from, { replace: true });
			setEmail('');
			setPassword('');
		} catch (err) {
			setErrMsg(jsonData?.error);
			errRef.current.focus();
		}
	};
	/* -- -- -- -- -- */

	if (signUpModal) {
		return <Register setOpenModal={setSignUpModal} />;
	}

	return (
		<div className='login'>
			<img src={logo} alt='' className='login__logo' />

			<section className='login__section'>
				<p
					ref={errRef}
					className={errMsg ? 'errmsg' : 'offscreen'}
					aria-live="assertive"
				>
					{errMsg}
				</p>
				<form onSubmit={handleSubmit}>
					<label htmlFor="emailcontent">
						<input
							placeholder='Adresse email'
							type="text"
							id="emailcontent"
							ref={emailRef}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							aria-describedby="emaildnote"
						/>
					</label>

					<label htmlFor="password">
						<input
							placeholder='Mot de passe'
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							aria-describedby="passwordnote"
						/>
					</label>

					<button type="submit" disabled={!!(!email || !password)}>
                        Se connecter
					</button>
				</form>
				<div></div>
				<p>
					<button
						type="button"
						className="openModalBtn"
						onClick={() => {
							setSignUpModal(true);
						}}
					>
                        Créer un Compte ?
					</button>
				</p>
			</section>
		</div>
	);
}

export default Login;
