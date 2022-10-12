/* --- Post routes File --- */

//Call the the modules and controllers
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.mdw');
const multer = require('../middlewares/multer.mdw');
const postCtrl = require('../controllers/post.ctrl');

//Post Routes
router.get('/', requireAuth, postCtrl.getAllPosts);
router.post('/create', requireAuth, multer, postCtrl.createPost);
router.put('/update/:id', requireAuth, multer, postCtrl.modifyPost);
router.post('/like/:id', requireAuth, postCtrl.like);
router.delete('/delete/:id', requireAuth, postCtrl.deletePost);


module.exports = router;