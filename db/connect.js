import mongoose from "mongoose"

//MongoDB database connection - called in server.js
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB