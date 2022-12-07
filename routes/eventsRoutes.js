import express from 'express'
const router = express.Router()

//could import to server.js but in this file it's easier to see which routes have restricted access
import authenticateUser from '../middleware/auth.js'

import { createEvent, deleteEvent, getAllEvents, updateEvent, showStats} from '../controllers/eventController.js'


//add authenticateUser to relevant routes
router.route('/').post(authenticateUser, createEvent).get(authenticateUser, getAllEvents)
router.route('/stats').get(authenticateUser, showStats)
router.route('/:id').delete(authenticateUser, deleteEvent).patch(authenticateUser, updateEvent)


export default router