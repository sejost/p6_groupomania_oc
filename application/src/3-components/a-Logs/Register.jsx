import React, { useRef, useState, useEffect } from 'react';
import {FaCheckSquare, FaTimes, FaInfo } from 'react-icons/fa';
import PropTypes from 'prop-types';

import axios from 'axios';

/* -- Regex -- */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{9,64}$/;

/* -- Main Function Register with SetOpenModal Props from Login -- */
function Register({ setOpenModal }) {

	/* -- useRef Déclaratations -- */
	const emailRef = useRef();
	const errorRef = useRef();
	
	/* -- UseState Déclaratations -- */
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(false);

	/* -- Proptypes -- */
	Register.propTypes = {
		setOpenModal: PropTypes.func.isRequired,
	};

	/* -- UseEffects declarations -- */
	//Define the automatic focus on the email
	useEffect(() => {
		emailRef.current.focus();
	}, [errorMsg]);

	//Test the email regex each email change
	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
		setErrorMsg('');
	}, [email]);

	//Test the password regex each password change
	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatch(password === matchPassword);
	}, [password, matchPassword]);

	/* -- Submit Form -- */
	const handleSubmit = async (e) => {
		e.preventDefault();
		//Blocks non-compliant requests if button force validated
		const valid1 = EMAIL_REGEX.test(email);
		const valid2 = PASSWORD_REGEX.test(password);
		if (!valid1 || !valid2) {
			setErrorMsg('Déclaration non conforme');
			return;
		}

		/* -- Axios Request  -- */
		try {
			await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API}auth/register`,
				data : {
					email : email,
					password : password
				},
				withCredentials : true,
			});

			setSuccess(true);
			setEmail('');
			setPassword('');
			setMatchPassword('');

		} catch (error) {
			const errorReceived = error.response.data.error;
			setPassword('');
			setMatchPassword('');
			setErrorMsg(errorReceived);
			errorRef.current.focus();
		}
	};

	/* -- Rendering part -- */
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				{
					success 
						? (
							<section>
								<h1>Compte créé avec succès !</h1>
								<p>
									<a
										onClick={() => setOpenModal(false)}
										href="/login"
									>
                                Connectez vous
									</a>
								</p>
							</section>
						) : (
							<section>
								<h2>Formulaire d&apos;insicrption à Groupomania</h2>
								<p
									ref={errorRef}
									className={errorMsg ? 'errormsg' : 'offscreen'}
									aria-live="assertive"
								>
									{errorMsg}
								</p>
								<form onSubmit={handleSubmit}>
									<label htmlFor="emailcontent">
										<FaCheckSquare className={validEmail ? 'valid' : 'hide'} />
										<FaTimes className={validEmail || !email ? 'hide' : 'invalid'} />
										<br />
										<input
											placeholder='Adresse email'
											type="text"
											id="emailcontent"
											ref={emailRef}
											autoComplete="off"
											onChange={(e) => setEmail(e.target.value)}
											value={email}
											required
											aria-invalid={validEmail ? 'false' : 'true'}
											aria-describedby="uidnote"
										/>
									</label>

									<label htmlFor="password">
										<FaCheckSquare
											className={validPassword ? 'valid' : 'hide'}
										/>
										<FaTimes
											className={
												validPassword || !password ? 'hide' : 'invalid'
											}
										/>
										<br/>
										<input
											placeholder='Mot de passe'
											type="password"
											id="password"
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											required
											aria-invalid={validPassword ? 'false' : 'true'}
											aria-describedby="passwordnote"
											onFocus={() => setPasswordFocus(true)}
											onBlur={() => setPasswordFocus(false)}
										/>
									</label>

									<p
										id="passwordnote"
										className={
											passwordFocus && !validPassword
												? 'instructions'
												: 'offscreen'
										}
									>
										<FaInfo />
                                Au moins 9 caractères.
										<br />
                                Doit inclure au moins : une lettre majuscule,
                                une miniscule, un chiffre et un caractère
                                spéciale.
									</p>

									<label htmlFor="confirm_password">
										<FaCheckSquare
											className={
												validMatch && matchPassword
													? 'valid'
													: 'hide'
											}
										/>
										<FaTimes
											className={
												validMatch || !matchPassword
													? 'hide'
													: 'invalid'
											}
										/>
										<br/>
										<input
											placeholder='Confirmer mot de passe'
											type="password"
											id="confirm_password"
											onChange={(e) =>
												setMatchPassword(e.target.value)
											}
											value={matchPassword}
											required
											aria-invalid={validMatch ? 'false' : 'true'}
											aria-describedby="confirmnote"
											onFocus={() => setMatchFocus(true)}
											onBlur={() => setMatchFocus(false)}
										/>
									</label>

									<p
										id="confirmnote"
										className={
											matchFocus && !validMatch
												? 'instructions'
												: 'offscreen'
										}
									>
										<FaInfo />
                                Doit correspondre au premier mot de passe
									</p>

									<button
										type="submit"
										disabled={
											!!(!validEmail || !validPassword || !validMatch)
										}
										// disabled={!validEmail || !validPassword || !validMatch ? true : false}
									>
                                S&apos;inscrire
									</button>
								</form>
							</section>
						)}
			</div>
		</div>
	);
}

export default Register;
