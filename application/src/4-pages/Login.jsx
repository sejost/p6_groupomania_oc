/* Login page rendering */
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../1-hooks/useAuth';
import Register from '../3-components/a-Logs/Register';
import logo from '../6-styles/5-images/icon-left-font.png';
import axios from 'axios';
/* -- -- -- -- */

/* -- Login Function -- */
function Login() {
	/* -- UseState, UseRef & UseEffect Declaration-- */
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const emailRef = useRef();
	const errorRef = useRef();

	const [signUpModal, setSignUpModal] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	// const [success, setSuccess] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
	}, [errorMsg]);
	/* -- -- -- --*/
	/* -- Function on Handle Submit Form -- */
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			let response = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API}auth/login`,
				data : {
					email :  email,
					password : password
				},
				withCredentials: true,
			});

			/* Get the needed information to setUp the Auth Context*/
			const token = response.data.token; 
			const userId = response.data.userId;
			const displayName = response.data.displayName;
			setAuth({token, userId, displayName});
			navigate(from, { replace: true });
			setEmail('');
			setPassword('');
		} 
		catch (error) {
			setErrorMsg(error.response.data.error);
			errorRef.current.focus();
		}
	};
	/* -- -- -- -- -- */

	/* The Signup Modal is waiting for the state to change then it's displayed */
	if (signUpModal) {
		return <Register setSignUpModal={setSignUpModal} />;
	}

	/* Otherwise the Login page is Rendered */
	return (
		<div className='login'>
			<img src={logo} alt='' className='login__logo' />

			<section className='login__section'>
				<p
					ref={errorRef}
					className={errorMsg ? 'errormsg' : 'offscreen'}
					aria-live="assertive"
				>
					{errorMsg}
				</p>
				<form onSubmit={handleSubmit}>
					<h1>Formulaire de connexion</h1>
					<label htmlFor="emailcontent">
						<input
							placeholder='Adresse email'
							type="text"
							id="emailcontent"
							ref={emailRef}
							autoComplete="off"
							onChange={(e) => setEmail((e.target.value).toLowerCase())}
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
				<p>
					{/* The link to display the SignUp Modal Component */}
					<span className='link'
						onClick={() => {
							setSignUpModal(true);
						}}>
						Vous n&apos;avez pas de compte ?
					</span>
				</p>
			</section>
		</div>
	);
}

export default Login;
