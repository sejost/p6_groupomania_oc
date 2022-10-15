const userModel = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id) => {
	return jwt.sign({id}, process.env.RANDOMSTRING, {expiresIn: 1500000})
}

exports.signUp = async (req, res, next) => {
	const createDisplayName = (info)  => {
		const name = info.split('@')[0];
		if (name.includes('.')){
			const firstPart = name.split('.')[0];
			const secondPart = name.split('.')[1];
			const firstName = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
			const lastName = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
			return `${firstName} ${lastName}`
		}
		return name.charAt(0).toUpperCase() + name.slice(1);
	}

	try{
		if(!req.body.email){
			const error = new Error(`Aucun email renseigné`);
			return res.status(403).json({message: error.message});
		}
		if(!req.body.password){
			const error = new Error(`Aucun mot de passe renseigné`);
			return res.status(403).json({message: error.message});
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const displayName = createDisplayName(req.body.email);
		const user = new userModel({
			email: req.body.email,
			password: hashedPassword,
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
		const displayName = user.displayName;
		const token = createToken(user._id);
		res.cookie('token', token, { httpOnly: true, sameSite : 'strict', secure : true, maxAge : 1500000});
		return res.status(200).json({
			token, 
			userId : user._id, 
			displayName: displayName
		});
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

