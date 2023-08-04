const mongoose = require('mongoose') // Import mongoose

const postSchema = new mongoose.Schema({ // Create post schema
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255 // Max length of 255 characters
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255 // Max length of 255 characters
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Type of object id referencing to the user model
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Default value of Date.now
    }
})

module.exports = mongoose.model('Post', postSchema) // Export post schema as a model called 'Post'
