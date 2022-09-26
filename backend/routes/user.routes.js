/* --- Users routes File --- */

//Call the the modules and controllers
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.mdw');
const userCtrl = require('../controllers/user.ctrl');

//Routes
router.get("/", requireAuth, userCtrl.getAllUsers);
router.get("/:id", requireAuth, userCtrl.userInfo);
router.put("/:id", requireAuth, userCtrl.updateUser);
router.delete("/:id", requireAuth, userCtrl.deleteUser);



module.exports = router;