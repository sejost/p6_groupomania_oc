/* --- Post routes File --- */

//Call the the modules and controllers
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.mdw');
const multer = require('../middlewares/multer.mdw');
const postCtrl = require('../controllers/post.ctrl');

//Routes
router.get('/', requireAuth, postCtrl.getAllPosts);
// router.post('/addpost', auth, multer, postCtrl.createPost);
// router.put('/', auth, multer, postCtrl.modifyPost);
// router.delete('/', auth, postCtrl.deletePost);
// router.post('/', auth, postCtrl.like);

module.exports = router;