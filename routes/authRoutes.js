import express from 'express'
const router = express.Router()

import {register, login, updateUser, getCurrentUser, getAllUsers, editUser, deleteUser, logout, makeAdmin} from '../controllers/authController.js'
import adminUser from '../middleware/adminUser.js'
import authenticateUser from '../middleware/auth.js'


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
// router.use(authController.clearanceLevel("admin"));
router.route('/updateUser').patch(authenticateUser, updateUser);

router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/getAllUsers').get(authenticateUser, adminUser, getAllUsers);
router.route('/editUser/:id').patch(authenticateUser, adminUser, editUser);
router.route('/getAllUsers/:id').delete(authenticateUser,adminUser, deleteUser).patch(authenticateUser,adminUser,makeAdmin);

export default router