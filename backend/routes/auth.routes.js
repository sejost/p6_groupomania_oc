/* --- Authentication routes File --- */

//Call the the modules and controllers
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.ctrl');

//Routes
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout', authCtrl.signOut)

module.exports = router;