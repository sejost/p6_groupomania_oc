/* --- Post Schema model File --- */

//Call the mongoose module to stored in Database
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    authorId: {
		type: String, 
		required: true 
	},

	authorName : {
		type: String, 
		required: true
	},

    usersLiked: { type: Array, default: [], required: false },



	postTitle: {
		type: String, 
		required: true,
		trim: true,
	},

	comments:{
		type: [
			{
				commenterId: String,
				commenterName: String, 
				commentText:  {
					type: String, 
					trim: true
				},
				commentImage : String,
				commentDate: {
					type : Date, 
					default: Date.now
				},
				commentUpDate: {
					type : Date, 
					default: Date.now
				},
			}
		],
	},

	likes: { 
		type: Number, 
		default: 0, 
		required: true 
	},

	postDate : { 
		type : Date, 
		default: Date.now
	},

	postUpDate : {
		type : Date, 
		default: Date.now
	},

    postText: { 
		type: String, 
		trim: true, 
		maxLenght: 500,
	},

    postImage: { 
		type: String 
	},
});

module.exports = mongoose.model('Post', postSchema);