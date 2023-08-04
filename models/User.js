const mongoose = require('mongoose') // Import mongoose

const userSchema = new mongoose.Schema({ // Create user schema
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255 // Max length of 255 characters
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255 // Max length of 255 characters
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024 // Max length of 1024 characters
    },
    date: {
        type: Date,
        default: Date.now // Default value of Date.now
    }
})

module.exports = mongoose.model('User', userSchema) // Export user schema as a model called 'User'

