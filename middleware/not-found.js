const notFoundMiddleware = (req,res) => res.status(404).send('Path does not exist')

export default notFoundMiddleware