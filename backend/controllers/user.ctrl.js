const userModel = require('../models/User.model');
const ObjectID = require("mongoose").Types.ObjectId;

exports.getAllUsers = async (req, res) => {
	const users = await userModel.find().select('-password');
	res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	userModel.findById(req.params.id, (err, docs) => {
		if (!err) res.send(docs);
		else console.log("ID unknown : " + err);
	}).select("-password");
};

// exports.updateUser = async (req, res) => {
// 	console.log('authentifiant : ', req.auth.userId);
// 	console.log('id demandé : ', req.params.id);
// 	if (!ObjectID.isValid(req.params.id)) {
// 		return res.status(400).send("ID unknown : " + req.params.id);
// 	}
// 	try {
// 		const doc = await userModel.findOneAndUpdate(
// 			{ _id: req.params.id },
// 			{$set: {
// 				displayName: req.body.displayName, 
// 				},
// 			},
// 			{ new: true, upsert: true, setDefaultsOnInsert: true },
// 		);
// 		res.status(200).json({doc});

// 	} catch (err) {
// 	return res.status(500).json({ message: err });
// 	}
// }

exports.updateUser = async (req, res, next) => {
	const user = req.params.id;
	const admin = '6322d9f62cc9ef10dd2271a9'
	try{
		if(!userModel.findOne({ _id: user })) return res.status(401).send('ID utilisateur inconnu');
		//const validRequester = (req.auth.id)
		console.log('Coucou 2 !', req.params.id)
		res.status(200).json({message : 'okok'});
	}
	catch{
		return res.status(500).json({ message: err });
	}
}

module.exports.deleteUser = async (req, res) => {
	if (!ObjectID.isValid(req.params.id)) {
	return res.status(400).send("ID unknown : " + req.params.id);
	}
	try {
		await userModel
			.remove({ _id: req.params.id })
			.exec();
		res.status(200).json({ message: "Successfully deleted. " });
		} catch (err) {
		return res.status(500).json({ message: err });
		}
	};
