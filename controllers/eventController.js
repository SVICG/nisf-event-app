import Event from '../models/Event.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'


const createEvent = async (req, res) => {
    const {eventTitle, capacity, eventType, targetAudience, description, date, startTime, endTime, admissionPrice, theme} = req.body;

    if(!eventTitle || !capacity || !eventType || !description || !startTime || !admissionPrice || !theme) {
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId
    const event = await Event.create(req.body)
    res.status(StatusCodes.CREATED).json({event})

    res.send ('create event')
}


const deleteEvent = async (req, res) => {
    res.send ('delete event')
}
const getAllEvents = async (req, res) => {
    res.send ('get all events')
}
const updateEvent = async (req, res) => {
    res.send ('update event')
}
const showStats = async (req, res) => {
    res.send ('show stats')
}




export { createEvent, deleteEvent, getAllEvents, updateEvent, showStats}