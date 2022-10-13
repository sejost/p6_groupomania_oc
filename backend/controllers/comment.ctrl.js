const ObjectId = require("mongoose").Types.ObjectId;
const postModel = require('../models/Post.model');

//Create a Comment
exports.createComment = (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);
	try {
		return postModel.findByIdAndUpdate(
		req.params.id,
		{
			$push: {
				comments: {
					commenterId: req.body.commenterId,
					commenterName: req.body.commenterName,
					commentText: req.body.commentText,
					},
			},
		},
		{ new: true })
			.then((data) => res.send(data))
			.catch((error) => res.status(500).send({ message: error }));
	} catch (error) {
		return res.status(400).send(error);
	}
};
