/* --- Admin routes File --- */

//Call the the modules and controllers
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.mdw');
const adminCtrl = require('../controllers/admin.ctrl');

//Routes
router.post('/', requireAuth, adminCtrl.admGetAllUsers);
router.put("/:id", requireAuth, adminCtrl.admUpdateUser);
//router.delete("/:id", requireAuth, adminCtrl.adDeleteUser);



module.exports = router;