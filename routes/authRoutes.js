import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: 'Too many requests'
})

import { register, login, updateUser, getCurrentUser, getAllUsers, editUser, deleteUser, logout, makeAdmin } from '../controllers/authController.js'
import adminUser from '../middleware/adminUser.js'
import authenticate from '../middleware/auth.js'


router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/logout').get(logout)
router.route('/updateUser').patch(authenticate, updateUser);

router.route('/getCurrentUser').get(authenticate, getCurrentUser);
router.route('/getAllUsers').get(authenticate, adminUser, getAllUsers);
router.route('/editUser/:id').patch(authenticate, adminUser, editUser);
router.route('/getAllUsers/:id').delete(authenticate, adminUser, deleteUser)
    .patch(authenticate, adminUser, makeAdmin);

export default router