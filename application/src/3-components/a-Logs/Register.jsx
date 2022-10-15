import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {FaCheckSquare, FaTimes, FaInfo } from 'react-icons/fa';

const axios = require('axios');

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{9,64}$/;

function Register({ setOpenModal }) {
	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	// // Proptypes definition
	Register.propTypes = {
		setOpenModal: PropTypes.func.isRequired,
	};

	// UseEffects declaration
	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatch(password === matchPassword);
	}, [password, matchPassword]);

	useEffect(() => {
		setErrMsg('');
	}, [email, password, matchPassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const valid1 = EMAIL_REGEX.test(email);
		const valid2 = PASSWORD_REGEX.test(password);
		if (!valid1 || !valid2) {
			setErrMsg('Déclaration non conforme');
			return;
		}

		try {
			let response = await axios({
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
		} catch (err) {
			setPassword('');
			setMatchPassword('');
			setErrMsg(err);
			if (!err?.response) {
				setErrMsg('Pas de réponse du serveur');
			} else if (err.response?.status === 409) {
				setErrMsg('Email déjà utilisé');
			} else {
				setErrMsg('Echec lors de la vérification');
			}
			errRef.current.focus();
		}
	};

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
								<h2>S&apos;inscrire à Groupomania</h2>
								<p
									ref={errRef}
									className={errMsg ? 'errmsg' : 'offscreen'}
									aria-live="assertive"
								>
									{errMsg}
								</p>
								<form onSubmit={handleSubmit}>
									<label htmlFor="emailcontent">
										<FaCheckSquare
											className={validEmail ? 'valid' : 'hide'}
										/>
										<FaTimes
											className={
												validEmail || !email
													? 'hide'
													: 'invalid'
											}
										/>
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
