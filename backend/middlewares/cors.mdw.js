const cors = require('cors');

const corsOptions = {
    origin: 'http://localho.st:3000/', // A définir plus strictement
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200, // IE11 doesn't support code success 204
};

module.exports = cors(corsOptions);
