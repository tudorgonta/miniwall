const mongoose = require('mongoose') // Import mongoose

const commentSchema = new mongoose.Schema({ // Create comment schema
    comment: {
        type: String,
        required: true,
        min: 6,
        max: 255 // Max length of 255 characters
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, // Type of object id referencing to the post model
        ref: 'Post',
        required: true
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

module.exports = mongoose.model('Comment', commentSchema) // Export comment schema as a model called 'Comment'

