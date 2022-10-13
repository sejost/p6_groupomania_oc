/* --- Post controllers File --- */
const ObjectId = require("mongoose").Types.ObjectId;
const postModel = require('../models/Post.model');
const fs = require('fs');

//Display all the posts
exports.getAllPosts = async (req, res, next) => {
    const posts = await postModel.find().sort({postDate : -1});
	try{
		res.status(200).send(posts);
	}
	catch(error){
		res.status(400).json({message : error});
	}
};

//Create a Post
exports.createPost = async (req, res, next) => {
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

exports.like = async (req, res, next) => {
	let postId = (req.params.id).toString()
	if (!ObjectId.isValid(postId)) {
		res.status(400).send("ID inconnu");
	}
	await ObjectId(postId);
	postModel.findById(postId)
		.then((post) => {
			const userId = req.body.userId;
            const usersLikedArr = post.usersLiked;
			if (!usersLikedArr.includes(userId)){
				post.likes = post.likes + 1;
				usersLikedArr.push(userId);
				post.save()
			}
			else{
				post.likes = post.likes - 1;
				usersLikedArr.splice(usersLikedArr.indexOf(userId));
				post.save()
			}
			res.status(201).json({ message: 'Action enregistré !', post })
		})
		.catch((error) => {
			console.log('Action impossible', error)
		})
}

// Modify post
exports.modifyPost = (req, res, next) => {
    postModel.findOne({ _id: req.params.id })
        .then((post) => {
            // Control the authorization of the user
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


//Delete a post
exports.deletePost = (req, res, next) => {
    postModel.findOne({ _id: req.params.id })
		.then((post) => {
            // Control the authorization of the user
            if ((process.env.ADMINID || post.authorId) != req.body.userId) {
                res.status(401).json({ message: 'Non authorisé' });
            } else {
                const imageFile = post.postImage.split('/images/')[1];
                //Delete the old image from the folder before delete the post
                fs.unlink(`images/${imageFile}`, () => {
                    postModel.deleteOne({ _id: req.params.id })
						.then(() => res.status(200).json({ message: 'Objet Supprimé!' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
