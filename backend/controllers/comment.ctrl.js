const ObjectId = require("mongoose").Types.ObjectId;
const postModel = require('../models/Post.model');

//Create a Comment
exports.createComment = (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('ID inconnu');
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

//Update a Comment
exports.modifyComment = (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('ID inconnu');

	try {
		postModel.findById(req.params.id, (error, post) => {
			const theComment = post.comments.find((comment) =>
			comment._id.toString() === req.body.commentId);

			if (!theComment) return res.status(404).send("Comment not found");
			theComment.commentText = req.body.commentText;
			
			// Control the authorization of the user
			const userId = req.body.commenterId;
			const adminId = process.env.ADMINID;
			const commenterId = theComment.commenterId;
			if ((userId != adminId) && (userId != commenterId)) return res.status(401).json({error : 'Non authorisé'})

			return post.save((error) => {
				if (!error) return res.status(200).send(post);
				return res.status(500).send(error);
			})
		})
	} catch (err) {
		return res.status(400).send(err);
	}
};

//Delete a Comment
exports.deleteComment = (req, res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('ID inconnu');

	try {
		postModel.findById(req.params.id, (error, post) => {
			const theComment = post.comments.find((comment) =>
			comment._id.toString() === req.body.commentId);

			if (!theComment) return res.status(404).send("Comment not found");
			theComment.commentText = req.body.commentText;

			// Control the authorization of the user
			const userId = req.body.commenterId;
			const adminId = process.env.ADMINID;
			const commenterId = theComment.commenterId;
			if ((userId != adminId) && (userId != commenterId)) return res.status(401).json({error : 'Non authorisé'})
		});
		postModel.findByIdAndUpdate(
		req.params.id,
		{
			$pull: {
			comments: {
				_id: req.body.commentId,
			},
			},
		},
		{ new: true })
				.then((data) => res.send(data))
				.catch((error) => res.status(500).send({ message: error }));
		} catch (err) {
			return res.status(400).send(err);
		}
};