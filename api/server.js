const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const {errorHandler} = require('./middleware/errorMiddleware')

const connectDB = require('./config/db')
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/auth'))
app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
