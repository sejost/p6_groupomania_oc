/* --- Authentication middleware File --- */

// Call the Jsonwebtoken module
const jwt = require('jsonwebtoken');
const userModel = require('../models/User.model');

module.exports.checkAuth = (req, res, next) => {
	const token = req.cookies.token;
	if (token) {
		jwt.verify(token, process.env.RANDOMSTRING, async (error, decodedToken) => {
			if (error) {
				res.locals.user = null;
				next();
			}
			else {
				let user = await userModel.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} 
	else {
		res.locals.user = null;
		next();
	}
};


module.exports.requireAuth = (req, res, next) => {
    try {
		token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.RANDOMSTRING); // Decoded the token
        const { userId } = decodedToken; // Verify the userID with its token
        req.auth = {
            userId,
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
