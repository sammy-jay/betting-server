import mongoose from 'mongoose'

const connectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    })
}
export default connectDB