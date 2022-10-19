const cors = require('cors');
require('dotenv').config();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
	credentials : true,
    optionsSuccessStatus: 200, // IE11 doesn't support code success 204
};

module.exports = cors(corsOptions);
