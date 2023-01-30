import Event from '../models/Event.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';


const createEvent = async (req, res) => {
    const { eventTitle, capacity, eventType, targetAudience, description, date, startTime, endTime, admissionPrice, theme } = req.body;

    if (!eventTitle || !capacity || !eventType || !description || !date || !startTime || !theme) {
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId
    const event = await Event.create(req.body)
    res.status(StatusCodes.CREATED).json({ event })

    res.send('create event')
}


const getAllEvents = async (req, res) => {
    const events = await Event.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ events, totalEvents: events.length, numOfPages: 1 })
    res.send('get all events')
}
const updateEvent = async (req, res) => {
    // use alias for id
    const { id: eventId } = req.params
    const { eventTitle, capacity, eventType, description, date, startTime, admissionPrice, theme } = req.body
    if (!eventTitle || !capacity || !eventType || !description || !date || !startTime || !theme) {
        throw new BadRequestError('Please provide all values')
    }

    const event = await Event.findOne({ _id: eventId })

    if (!event) {
        throw new NotFoundError(`Cannot find event ${eventId}`)
    }

    //check permissions - pass in entire user object to check for roles
    checkPermissions(req.user, event.createdBy)

    //will need to use alternative method if needing to fire hooks
    const updatedEvent = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json({ updatedEvent })
}

const deleteEvent = async (req, res) => {
    const { id: eventId } = req.params
    const event = await Event.findOne({ _id: eventId })

    if (!event) {
        throw new NotFoundError(`Cannot find event ${eventId}`)
    }

    //check permissions - pass in entire user object to check for roles
    checkPermissions(req.user, event.createdBy)

    await event.remove()

    res.status(StatusCodes.OK).json({ msg: 'Event has been deleted' })
}


const showStats = async (req, res) => {
    let stats = await Event.aggregate([
        //match events that belong to certain user
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ])
    //return stats as an object instead of array
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc

    }, {})

    //default for new user / no events
    const defaultStats = {
        pending: stats.pending || 0,
        approved: stats.approved || 0,
        declined: stats.declined || 0,

    }

    let weeklySubmissions = await Event.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { 
            _id: { year: {$year: '$createdAt'}, month: {$month:'$createdAt'}, week: { $week: '$createdAt' } },
            count: { $sum: 1},
        },
        },
        //sort by latest event first
        {$sort:{'_id.year':-1, '_id.week':-1}},
        {$limit:6}
    ])

    weeklySubmissions = weeklySubmissions.map((item) => {
        const {_id:{year, week, month}, count} = item
        const date = moment().month(month -1).year(year).week(week).format('[Week] w[,] MMM YYYY')
        return {date, count}
    })
    .reverse()

    res.status(StatusCodes.OK).json({ defaultStats, weeklySubmissions })
}


export { createEvent, deleteEvent, getAllEvents, updateEvent, showStats }