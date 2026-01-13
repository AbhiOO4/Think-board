import dotenv from "dotenv";

import express from 'express';

import notesRoutes from './routes/notesRoutes.js';

import connectDB from './config/db.js';

import rateLimiter from './middleware/rateLimiter.js'

import cors from 'cors'

dotenv.config({quiet: true})
const app = express()

//middlewares

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(rateLimiter)


//routes
app.use('/api/notes', notesRoutes)

//connect to db function
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started at port 3000")
    })
})



