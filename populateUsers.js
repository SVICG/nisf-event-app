import {readFile} from 'fs/promises'
import dotenv from 'dotenv'

dotenv.config()

import connectDB from './db/connect.js'
import User from './models/User.js'

const start = async () => {
try {
    await connectDB(process.env.MONGO_URL)
    // await Event.deleteMany()
    const jsonProducts = JSON.parse(await readFile(new URL('./users-data.json', import.meta.url)))
    await User.create(jsonProducts)
    console.log('Success')
    process.exit(0)
} catch (error) {
    console.log(error)
    process.exit(0)
}
}
start()