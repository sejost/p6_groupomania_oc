/* --- Post controllers File --- */

//Call the post model
const Post = require('../models/Post.model');

//Call the File System module
const fs = require('fs');

//Create a Post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    //Delete id and userId for security reason
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //Create a new post into the database
    post.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

//Display one post
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => { res.status(200).json(post) })
        .catch((error) => { res.status(404).json({ error: error }) });
};

//Modify one post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        //Controle the presence of an image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete postObject._userId;

    //Display a specific post in order to modify it
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            // Control the authorization of the user
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = post.imageUrl.split('/images/')[1];
                //Delete the old image from the folder before updating it
                fs.unlink(`images/${filename}`, () => {
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Find a post then delete it
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            // Control the authorization of the user
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = post.imageUrl.split('/images/')[1];
                //Delete the old image from the folder before delete the post
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => { res.status(500).json({ error }) });
};

//Display all the posts
exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => { res.status(200).json(posts) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

//Manage the likes&dislikes
exports.like = (req, res, next) => {
    //Display a specific post in order to like it or not
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            const userId = req.body.userId;
            const usersLikedArr = post.usersLiked;
            const usersDislikedArr = post.usersDisliked;
            //Conditions - If user clicked on like and hasn't already clicked on like or dislike, proceed
            if (req.body.like == 1 && (!usersLikedArr.includes(userId) || !usersDislikedArr.includes(userId))) {
                post.likes++;
                usersLikedArr.push(userId);
                post.save()
                    .then(() => { res.status(201).json({ message: 'Like enregistré !' }) })
                    .catch(error => { res.status(400).json({ error }) })
            }
            //Conditions - If user clicked on dislike and hasn't already clicked on like or dislike, proceed
            else if (req.body.like == -1 && (!usersLikedArr.includes(userId) || !usersDislikedArr.includes(userId))) {
                post.dislikes++;
                usersDislikedArr.push(userId);
                post.save()
                    .then(() => { res.status(201).json({ message: 'Dislike enregistré !' }) })
                    .catch(error => { res.status(400).json({ error }) })
            }
            //Conditions - If user clicked on un-dislike and has already clicked on dislike, proceed
            else if (req.body.like == 0 && usersDislikedArr.includes(userId)) {
                post.dislikes--;
                usersDislikedArr.splice(usersDislikedArr.indexOf(userId));
                post.save()
                    .then(() => { res.status(201).json({ message: 'Dislike retiré !' }) })
                    .catch(error => { res.status(400).json({ error }) })
            }
            //Conditions - If user clicked on un-like and has already clicked on like, proceed
            else if (req.body.like == 0 && usersLikedArr.includes(userId)) {
                post.likes--;
                usersLikedArr.splice(usersLikedArr.indexOf(userId));
                post.save()
                    .then(() => { res.status(201).json({ message: 'Like retiré !' }) })
                    .catch(error => { res.status(400).json({ error }) })
            }
            //Conditions - If anything else, can't go
            else {
                error(`Action impossible`)
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}