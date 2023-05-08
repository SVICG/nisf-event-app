import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

//import security packages
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//reduces need for try/catch blocks
import 'express-async-errors'

//db & auth
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import eventsRouter from './routes/eventsRoutes.js'


//import middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

//cookies pareser
import cookieParser from 'cookie-parser'

//display method route and response in console
if (process.env.NODE_ENV !== 'prodution' || !process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

//Load middleware
//built-in middleware
app.use(express.static(path.resolve(__dirname, './nisf-event-app/build')))
app.use(express.json());

//security packages
app.use(xss())
app.use(helmet())
app.use(mongoSanitize())

app.use(cookieParser());

app.get('/api/v1', (req, res) => {
    res.json({ msg: 'API' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/events', authRouter, eventsRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './nisf-event-app/build', 'index.html'))
})

//middleware after searching all routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        let dbUrl = process.env.MONGO_URL // default to the main DB 
        if (process.env.NODE_ENV === 'test') {
            dbUrl = process.env.TEST_MONGO_URL // use test DB URL if NODE_ENV is 'test'
        }
        await connectDB(dbUrl)

        app.listen(port, () => {
            if (!process.env.NODE_ENV === 'test') {
                console.log(`Server is listening on port ${port}`)
            };
            
        })
    } catch (error) {
        console.log(error)
    }
}

start()

export default app;
