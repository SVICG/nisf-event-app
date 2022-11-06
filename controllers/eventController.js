const createEvent = async (req, res) => {
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