import mongoose from "mongoose"

//const connectionString = 'mongodb+srv://40313430:<password>@nisfproject.0jaq6ng.mongodb.net/NISFProject?retryWrites=true&w=majority'

const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB