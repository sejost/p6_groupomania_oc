/* --- Comment routes File --- */

//Call the the modules and controllers
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.mdw');
const commentCtrl = require('../controllers/comment.ctrl');


//Comment Routes
router.put('/create/:id', requireAuth, commentCtrl.createComment);
router.put('/update/:id', requireAuth, commentCtrl.modifyComment);
router.delete('/delete/:id', requireAuth, commentCtrl.deleteComment);
//router.post('/like/:id', requireAuth, commentCtrl.like);


module.exports = router;