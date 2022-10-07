/* --- Post controllers File --- */
const ObjectId = require("mongoose").Types.ObjectId;
const postModel = require('../models/Post.model');
const fs = require('fs');
const { info } = require('console');

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
		const post = await newPost.save();
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

// Modify one post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        //Controle the presence of an image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    // Display a specific post in order to modify it
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            // Control the authorization of the user
            if (post.authorId != req.auth.authorId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                const filename = post.imageUrl.split('/images/')[1];
                //Delete the old image from the folder before updating it
                fs.unlink(`images/${filename}`, () => {
                    post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


//Display one post
// exports.getOnePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then((post) => { res.status(200).json(post) })
//         .catch((error) => { res.status(404).json({ error: error }) });
// };


//Find a post then delete it
// exports.deletePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then(post => {
//             // Control the authorization of the user
//             if (post.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 const filename = post.imageUrl.split('/images/')[1];
//                 //Delete the old image from the folder before delete the post
//                 fs.unlink(`images/${filename}`, () => {
//                     Post.deleteOne({ _id: req.params.id })
//                         .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
//                         .catch(error => res.status(401).json({ error }));
//                 });
//             }
//         })
//         .catch(error => { res.status(500).json({ error }) });
// };
