import express from 'express'
const router = express.Router()

//could import to server.js but in this file it's easier to see which routes have restricted access
import authenticateUser from '../middleware/auth.js'

import { createEvent, deleteEvent, getAllEvents, updateEvent, showStats} from '../controllers/eventController.js'
// import {secure} from '../controllers/authController.js'

//add authenticateUser to relevant routes
router.route('/').post(authenticateUser, createEvent).get(authenticateUser, getAllEvents)
router.route('/:id').delete(authenticateUser, deleteEvent).patch(authenticateUser, updateEvent)
// router.use(secure)
router.route('/stats').get(authenticateUser, showStats)



export default router