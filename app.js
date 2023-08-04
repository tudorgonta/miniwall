const express = require('express')

// Mongoose
const mongoose = require('mongoose')

// Initialise express
const app = express()
// dotenv
require('dotenv').config()
// Body parser
const bodyParser = require('body-parser')

// Middleware
app.use(bodyParser.json())

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comment')
const likeRoute = require('./routes/like')

// Import middleware
const verifyToken = require('./middleware/verifyToken')

// Routes
app.use('/api/user', authRoute)
app.use('/api/posts', verifyToken, postRoute)
app.use('/api/comments', verifyToken, commentRoute)
app.use('/api/likes', verifyToken, likeRoute)

// Connect to DB 
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err))

// Listen to server
app.listen(process.env.PORT, () => console.log('Server up and running on port:' + process.env.PORT))

