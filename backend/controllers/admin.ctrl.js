const userModel = require('../models/User.model');
require('dotenv').config();

exports.admGetAllUsers = async(req, res) => {
	const token = await req.cookies.token;
	const userId = await req.body.userId
	const isAdmin = process.env.ADMINID == userId;

	if(!(token && isAdmin)) 
		return res.status(401).json('Opération non authorisé');
	const users = await userModel.find().select('-__v');
	try{
		res.status(200).json(users);
	}
	catch{
		res.status(500).json('Requête en erreur')
	}
	
}

exports.admUpdateUser = async (req, res, next) => {
	const token = req.cookies.token;
	if(!userModel.findOne({ _id: req.params.id })) 
		return res.status(400).json('ID utilisateur inconnu');
	if(!token) return res.status(401).json('Opération non authorisé');
	try{
		const doc = await userModel.findOneAndUpdate(
			{ _id: req.params.id },
			{$set: {
				displayName: req.body.displayName, 
				},
			},
			{ 
				new: true, 
				upsert: true, 
				setDefaultsOnInsert: true 
			},
		);
		res.status(200).json(`Opération réussie : ${doc.displayName}`);
	}
	catch(error){
		return res.status(500).json({ message: error });
	}
}
