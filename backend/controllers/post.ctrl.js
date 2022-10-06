/* --- Post controllers File --- */
const ObjectId = require("mongoose").Types.ObjectId;
const postModel = require('../models/Post.model');
const userModel = require('../models/User.model');
const fs = require('fs');
const { info } = require('console');

//Display all the posts
exports.getAllPosts = async (req, res, next) => {
    const posts = await postModel.find();
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
	
	if (!ObjectId.isValid(req.body.postId))
    return ObjectId(req.body.postId), res.status(400).send("ID inconnu : ");
	postModel.findById(req.body.postId)
		.then((post) => {
			const userId = req.body.userId;
            const usersLikedArr = post.usersLiked;
			if (!usersLikedArr.includes(userId)){
				post.likes = post.likes + 1;
				usersLikedArr.push(userId);
				post.save()
					.then(() => { res.status(201).json({ message: 'Like enregistré !' }) })
					.catch(error => { res.status(400).json({ error }) })
			}
			else{
				post.likes = post.likes - 1;
				usersLikedArr.splice(usersLikedArr.indexOf(userId));
				post.save()
					.then(() => { res.status(201).json({ message: 'Like retiré !' }) })
					.catch(error => { res.status(400).json({ error }) })
			}
		})
		.catch((error) => {
			console.log('Action impossible', error)
		})
}

exports.blablalike = async (req, res, next) => {
	if (!objectID.isValid(req.body.postId))
    return res.status(400).send("ID inconnu : ");	
	let likerId = await req.body.userId
	let post = await postModel.postId;
	let usersLiked = await postModel.usersLiked;
	console.log(post)
	// try{
	// 	if (usersLiked.includes(likerId)){
	// 		post.likes = postModel.likes - 1;
	// 		usersLiked.splice(usersLiked.indexOf(likerId));
	// 		await postModel.save();
    //         await res.status(201).json({
	// 			message: 'Like retiré !',
	// 			postModel : likes 
	// 		});
	// 	}
	// 	else{
	// 		postModel.likes = postModel.likes + 1
	// 		usersLiked.push(likerId);
	// 		await postModel.save();
	// 		await res.status(201).json({
	// 			message: 'Like enregistré !',
	// 			postModel
	// 		});
	// 	};
	// }
	// catch(error){
	// 	res.status(400).json({message : error});
	// }

	// catch(error){
	// 	res.status(400).json({message : error})
	// }
	// status(400).json({message : error})
	// }
		
}

//Display one post
// exports.getOnePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then((post) => { res.status(200).json(post) })
//         .catch((error) => { res.status(404).json({ error: error }) });
// };

//Modify one post
// exports.modifyPost = (req, res, next) => {
//     const postObject = req.file ? {
//         ...JSON.parse(req.body.post),
//         //Controle the presence of an image
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
//     delete postObject._userId;

    //Display a specific post in order to modify it
//     Post.findOne({ _id: req.params.id })
//         .then((post) => {
//             // Control the authorization of the user
//             if (post.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 const filename = post.imageUrl.split('/images/')[1];
//                 //Delete the old image from the folder before updating it
//                 fs.unlink(`images/${filename}`, () => {
//                     Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
//                         .then(() => res.status(200).json({ message: 'Objet modifié!' }))
//                         .catch(error => res.status(401).json({ error }));
//                 });
//             }
//         })
//         .catch((error) => {
//             res.status(400).json({ error });
//         });
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
