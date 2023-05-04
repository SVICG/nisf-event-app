import express from 'express'
const router = express.Router()

//could import to server.js but in this file it's easier to see which routes have restricted access
import authenticateUser from '../middleware/auth.js'

import { createEvent, deleteEvent, updateStatus, getAllEvents, updateEvent, showStats} from '../controllers/eventController.js'
import adminUser from '../middleware/adminUser.js'


//add authenticateUser to relevant routes
router.route('/').post(authenticateUser, createEvent).get(authenticateUser, getAllEvents)
router.route('/:id').delete(authenticateUser, deleteEvent).patch(authenticateUser, updateEvent)
router.route('/status/:id').patch(authenticateUser, adminUser, updateStatus)
router.route('/stats').get(authenticateUser,adminUser, showStats)




export default router