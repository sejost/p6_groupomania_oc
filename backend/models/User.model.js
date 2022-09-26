/* --- User Schema model File --- */

//Call the mongoose module to stored in Database
const mongoose = require('mongoose');

//Call the Unique Validator module
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
	displayName: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 26
	}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);