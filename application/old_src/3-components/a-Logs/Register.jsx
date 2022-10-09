import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import {
// 	faCheck,
// 	faTimes,
// 	faInfoCircle,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaCheckSquare, FaTimes, FaInfo } from 'react-icons/fa';

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{9,64}$/;

function Register({ setOpenModal }) {
	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
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
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [email, pwd, matchPwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const valid1 = EMAIL_REGEX.test(email);
		const valid2 = PWD_REGEX.test(pwd);
		if (!valid1 || !valid2) {
			setErrMsg('Unvalid Entry ');
			return;
		}
		const password = pwd;
		const data = { email, password };
		const settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Headers': true,
				'Content-Type': 'application/json',
				withCredentials: true,
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(data),
		};
		try {
			// const response = await fetch(REGISTER_URL, settings);
			// const jsonData = await response.json();
			fetch(`${process.env.REACT_APP_API_URL}signup`, settings);
			setSuccess(true);
			setEmail('');
			setPwd('');
			setMatchPwd('');
		} catch (err) {
			setPwd('');
			setMatchPwd('');
			setErrMsg(err);
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Email already used');
			} else {
				setErrMsg('Registration Failed');
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
											//icon={faCheck}
											//icon={FaCheckSquare}
											className={validEmail ? 'valid' : 'hide'}
										/>
										<FaTimes
											//icon={faTimes}
											//icon={FaTimes}
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
											//icon={faCheck}
											//icon={FaCheckSquare}
											className={validPwd ? 'valid' : 'hide'}
										/>
										<FaTimes
											//icon={faTimes}
											//icon={FaTimes}
											className={
												validPwd || !pwd ? 'hide' : 'invalid'
											}
										/>
										<br/>
										<input
											placeholder='Mot de passe'
											type="password"
											id="password"
											onChange={(e) => setPwd(e.target.value)}
											value={pwd}
											required
											aria-invalid={validPwd ? 'false' : 'true'}
											aria-describedby="pwdnote"
											onFocus={() => setPwdFocus(true)}
											onBlur={() => setPwdFocus(false)}
										/>
									</label>

									<p
										id="pwdnote"
										className={
											pwdFocus && !validPwd
												? 'instructions'
												: 'offscreen'
										}
									>
										{/* <FontAwesomeIcon icon={faInfoCircle} /> */}
										<FaInfo />
                                Au moins 9 caractères.
										<br />
                                Doit inclure au moins : une lettre majuscule,
                                une miniscule, un chiffre et un caractère
                                spéciale.
									</p>

									<label htmlFor="confirm_pwd">
										<FaCheckSquare
											//icon={faCheck}
											//icon={FaCheckSquare}
											className={
												validMatch && matchPwd
													? 'valid'
													: 'hide'
											}
										/>
										<FaTimes
											//icon={faTimes}
											//icon={FaTimes}
											className={
												validMatch || !matchPwd
													? 'hide'
													: 'invalid'
											}
										/>
										<br/>
										<input
											placeholder='Confirmer mot de passe'
											type="password"
											id="confirm_pwd"
											onChange={(e) =>
												setMatchPwd(e.target.value)
											}
											value={matchPwd}
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
										{/* <FontAwesomeIcon icon={faInfoCircle} /> */}
										<FaInfo />
                                Doit correspondre au premier mot de passe
									</p>

									<button
										type="submit"
										disabled={
											!!(!validEmail || !validPwd || !validMatch)
										}
										// disabled={!validEmail || !validPwd || !validMatch ? true : false}
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
