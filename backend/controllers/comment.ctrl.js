const ObjectId = require("mongoose").Types.ObjectId;
const postModel = require('../models/Post.model');

//Create a Post
exports.createComment = async (req, res, next) => {
	const newPost = new postModel({
		...postModel,
		authorName : req.body.authorName,
		authorId : req.body.userId,
		postTitle : req.body.postTitle,
		postText : req.body.postText,
		postImage: !req.body.image ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
	})
	try{
		await newPost.save();
		res.status(201).json({
			message : 'Nouveau post transmit !'
		})
	}
	catch{
		res.status(400).json({message : error});
	}
};

exports.modifyPost = (req, res, next) => {
    postModel.findOne({ _id: req.params.id })
        .then((post) => {
            // Control the authorization of the user
			console.log('authorId : ', post.authorId)
			console.log('userId : ', req.body.userId)
			console.log('AdminID : ', process.env.ADMINID)
            //if ((post.authorId != req.body.userId) || (`${process.env.ADMINID}` != req.body.userId)) {
			if ((process.env.ADMINID || post.authorId) != req.body.userId) {
                res.status(401).json({ message: 'Non authorisé ' });
            } else {
				let postObject = {}
				if(req.file?.filename == undefined){
					console.log('Aucune nouvelle image reçue', req.body.image)
					postObject = {
						postText : req.body.postText,
						postTitle : req.body.postTitle,
					}
				}
				else{
					const imageFile = post.postImage.split('/images/')[1];
					fs.unlink(`images/${imageFile}`, () => {
						console.log('ok')
					})
					console.log('Nouvelle image reçue')
					postObject = {
						postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
						postText : req.body.postText,
						postTitle : req.body.postTitle,
					}
				}
                postModel.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};