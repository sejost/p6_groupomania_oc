const { model } = require('mongoose');
const userModel = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id) => {
	return jwt.sign({id}, process.env.RANDOMSTRING, {expiresIn: 300000})
}

const createDisplayName = (info)  => {
	const name = info.split('@')[0];
	if (name.includes('.')){
		const firstPart = name.split('.')[0];
		const secondPart = name.split('.')[1];
		const firstName = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
		const lastName = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
		return `${firstName} ${lastName}`
	}
	return initialName.charAt(0).toUpperCase() + initialName.slice(1);
}

exports.signUp = async (req, res, next) => {
	const {email, password} = req.body;
	try{
		if(!email){
			const error = new Error(`Aucun email renseigné`);
			return res.status(403).json({message: error.message});
		}
		if(!password){
			const error = new Error(`Aucun mot de passe renseigné`);
			return res.status(403).json({message: error.message});
		}
		const hashedPwd = await bcrypt.hash(password, 10);
		const displayName = createDisplayName(email);
		const user = new userModel({
			email: email,
			password: hashedPwd,
			displayName: displayName
		});
		user.save()
		res.status(201).json({message : `Compte créé : ${displayName}`})
	}
	catch(error){
		res.status(500).json({message : error.message});
	}
}

exports.signIn = async (req, res, next) => {
	try {
		const user = await userModel.findOne({email: req.body.email});	
		if(!user){
			const error = new Error(`Utilisateur inconnu`);
			return res.status(401).json({message: error.message});
		}
		const validPwd = await bcrypt.compare(req.body.password, user.password);
		if (!validPwd){
			const error = new Error('Mot de passe incorrect');
			return res.status(401).json({message: error.message});
		}
		const token = createToken(user._id);
		res.cookie('token', token, { httpOnly: true, maxAge : 300000});
		return res.status(200).json({token});
	}
	catch(error){
		console.error(error);
		res.status(500).json({message : error.message})
	}
};

exports.signOut = (req, res, next) => {
	try{
		res.cookie('token', '', { maxAge : 1})
		res.redirect('/')
	}
	catch(error){
		res.status(500).json({message : error.message})
	}
}

