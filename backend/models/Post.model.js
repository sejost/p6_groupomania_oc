/* --- Post Schema model File --- */

//Call the mongoose module to stored in Database
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number, default: 0, required: false },
    usersLiked: { type: Array, default: [], required: false },
});

module.exports = mongoose.model('Post', postSchema);