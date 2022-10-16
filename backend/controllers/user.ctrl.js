const userModel = require('../models/User.model');
//const ObjectID = require("mongoose").Types.ObjectId;

exports.getAllUsers = async (req, res) => {
	const users = await userModel.find().select('-_id').select('-password').select('-email').select('-__v');
	try{
		res.status(200).json(users);
	}
	catch{
		res.status(500).json('Requête en erreur')
	}
}

exports.userInfo = (req, res) => {
	if(!userModel.findOne({ _id: req.params.id })) 
		return res.status(400).json('ID utilisateur inconnu');

	userModel.findById(req.params.id, (err, docs) => {
		if (!err) res.send(docs);
		else res.status(401).json('ID inconnu');
	}).select("-password");
};

exports.updateUser = async (req, res, next) => {
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

module.exports.deleteUser = async (req, res) => {
	if(!userModel.findOne({ _id: req.params.id })) 
		return res.status(400).json('ID utilisateur inconnu');
	try {
		await userModel
			.remove({ _id: req.params.id })
			.exec();
		res.status(200).json({ message: "Successfully deleted. " });
		} catch (err) {
		return res.status(500).json({ message: err });
		}
	};
