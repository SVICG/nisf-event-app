import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

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


//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

import cookieParser from 'cookie-parser'

//display method route and response in console
if (process.env.NODE_ENV !== 'prodution') {
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './nisf-event-app/build')))
app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())


app.use(cookieParser());

// app.get('/',(req, res) => {
//     res.json({msg: 'Welcome'})
// })

app.get('/api/v1', (req, res) => {
    res.json({ msg: 'API' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/events', authRouter, eventsRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './nisf-event-app/build', 'index.html'))
})

//looking for all htttp
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()