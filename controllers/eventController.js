import Event from '../models/Event.js'
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../customErrors/index.js'
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';
import emailStatusUpdate from '../utils/email.js';



const createEvent = async (req, res) => {
    const { eventTitle, capacity, eventType, description, date, startTime, theme } = req.body;

    if (!eventTitle || !capacity || !eventType || !description || !date || !startTime || !theme) {
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId
    const user = await User.findOne({ _id: req.user.userId });
    const event = await Event.create(req.body)
    res.status(StatusCodes.CREATED).json({ event })

     //email sent to user on approval
     try {
        await emailStatusUpdate({
            type: 'submission',
            name: user.name,
            email: user.email,
            subject: 'Your event has been submitted',
        });

        res.status(StatusCodes.OK)
    } catch (err) {
        console.log(err);
        return
    }

    res.send('create event')
}


const getAllEvents = async (req, res) => {

    const { status, eventType, sortDate, theme, targetAudience, sort, search } = req.query
    //return events that meet the query
    const user = await User.findOne({ _id: req.user.userId });
    const queryObject = {}
    // check if user is admin, if so, allow them to see all events
    if (user.isAdmin) {
    } else {
       // filter events by createdBy field, which should match the userId of the current user
        queryObject.createdBy = req.user.userId
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (eventType && eventType !== 'all') {
        queryObject.eventType = eventType
    }
    if (theme && theme !== 'all') {
        queryObject.theme = theme
    }
    if (targetAudience && targetAudience !== 'all') {
        queryObject.targetAudience = targetAudience
    }

    if (search) {
        queryObject.eventTitle = { $regex: search, $options: 'i' }
    }
    let results = Event.find(queryObject).populate('createdBy')
    if (sortDate === 'newest') {
        results = results.sort('-date')
    }

    if (sortDate === 'oldest') {
        results = results.sort('date')
    }
    if (sort === 'newest') {
        results = results.sort('-createdAt')
    }

    if (sort === 'oldest') {
        results = results.sort('createdAt')
    }

    //pagination - 1 page is default
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    //calculate how many items to skip
    const eventSkip = (page - 1) * limit 

    results = results.skip(eventSkip).limit(limit)

    const events = await results

    const totalEvents = await Event.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalEvents / limit)

    res.status(StatusCodes.OK).json({ events, totalEvents, numOfPages })

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
    //will need to use alternative method if needing to fire hooks
    const updatedEvent = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json({ updatedEvent })
}

const updateStatus = async (req, res) => {
    // use alias for id
    const { id: eventId } = req.params
    const { status } = req.body
    const event = await Event.findOne({ _id: eventId })
    const user = await User.findOne({ _id: event.createdBy });

    if (!event) {
        throw new NotFoundError(`Cannot find event ${eventId}`)
    }
    const updatedEvent = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
        new: true,
        runValidators: true,
    })
    if (status === 'approved') {
        //email sent to user on approval
        try {
            await emailStatusUpdate({
                type: 'approval',
                name: user.name,
                email: user.email,
                subject: 'Your event has been approved',
            });

            res.status(StatusCodes.OK)
        } catch (err) {
            console.log(err);
            return
        }
    }
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
    // return all events grouped by status
    let stats = await Event.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ])
    //return stats as an object instead of array
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc

    }, {})
    //default for no events
    const defaultStats = {
        pending: stats.pending || 0,
        approved: stats.approved || 0,
        declined: stats.declined || 0,
    }

    //return events by county
    let eventCounty = await Event.aggregate([
        { $group: { _id: '$eventLocation.eventCounty', count: { $sum: 1 } } },
    ])
    //return events by theme
    let eventTheme = await Event.aggregate([
        { $group: { _id: '$theme', count: { $sum: 1 } } },
    ])
    //return events by type
    let eventTypes = await Event.aggregate([
        { $group: { _id: '$eventType', count: { $sum: 1 } } },
    ])

    let weeklySubmissions = await Event.aggregate([
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, week: { $week: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        //sort by latest event first
        { $sort: { '_id.year': -1, '_id.week': -1 } },
        { $limit: 6 }
    ])

    weeklySubmissions = weeklySubmissions.map((item) => {
        const { _id: { year, week, month }, count } = item
        const date = moment().month(month - 1).year(year).week(week).format('[Week] w[,] MMM YYYY')
        return { date, count }
    })
        .reverse()

    res.status(StatusCodes.OK).json({ defaultStats, weeklySubmissions, eventTheme, eventTypes, eventCounty })
}



export { createEvent, deleteEvent, getAllEvents, updateEvent, updateStatus, showStats }