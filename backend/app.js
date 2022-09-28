/* --- Main app file --- */

//Call the modules
const express = require('express');
const app = express();
const cors = require('./middlewares/cors.mdw')
const mongoose = require('mongoose');
const helmet = require('helmet')
const cookieParser = require('cookie-parser');

require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes')
const usersRoutes = require('./routes/user.routes')

const path = require('path');
const { checkAuth, requireAuth } = require('./middlewares/auth.mdw');

//Connect to the mongoDB DataBase
mongoose.connect(process.env.DBSERVER,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use(cors);
app.use(cookieParser());


app.get('*', checkAuth);
app.get('/jwtid', requireAuth, (req, res) => {
	console.log(res.locals)
	res.status(200).send(res.locals.user._id)
});
//Use the routes to stock images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/user', usersRoutes);

//Add Helmet to use some more protections
app.use(helmet());

module.exports = app;