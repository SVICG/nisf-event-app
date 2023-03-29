import express from 'express'
const router = express.Router()

import {register, login, updateUser, getCurrentUser, getAllUsers, editUser, deleteUser, logout, makeAdmin} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
// router.use(authController.clearanceLevel("admin"));
router.route('/updateUser').patch(authenticateUser, updateUser);

router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/getAllUsers').get(authenticateUser, getAllUsers);
router.route('/editUser/:id').patch(authenticateUser, editUser);
router.route('/:id').delete(authenticateUser, deleteUser).patch(authenticateUser, makeAdmin);

export default router