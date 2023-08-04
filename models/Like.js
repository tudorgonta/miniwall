const mongoose = require('mongoose') // Import mongoose

const likeSchema = new mongoose.Schema({ // Create like schema
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

module.exports = mongoose.model('Like', likeSchema) // Export like schema as a model called 'Like'