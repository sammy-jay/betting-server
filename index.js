import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import user from "./routes/user.js"
import connectDB from './db/connect.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use('/api/v1/auth', user)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()