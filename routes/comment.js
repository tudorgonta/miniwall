const express = require('express') // Import express

const router = express.Router() // Create router

// Import comment model
const Comment = require('../models/Comment')

const Post = require('../models/Post') // Import post model

const { commentValidation } = require('../validations/validations') // Import validation

// Get all comment by postId
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.postId}) // Find all comments by postId
        res.send(comments) // Send comments
    } catch (err) {
        res.status(400).send({message:err}) // Send error if comments cannot be found
    }
})

// Get all comment by userId
router.get('/user/:userId', async (req, res) => {
    try {
        const comments = await Comment.find({userId: req.params.userId}) // Find all comments by userId
        
        res.send(comments) // Send comments
    } catch (err) {
        res.status(400).send({message:err}) // Send error if comments cannot be found
    }
})

// Create comment
router.post('/', async (req, res) => {

    // Check if post of the userId, then return error because cant comment own post
    const ownPost = await Post.findOne({_id: req.body.postId, userId: req.body.userId})
    if (ownPost) return res.status(400).send({message:'Cannot comment own post'})

    const { error } = commentValidation(req.body) // Validate data before creating comment
    if (error) return res.status(400).send({message:error['details'][0]['message']}) // Send error if validation fails

    const comment = new Comment({ // Create new comment
        comment: req.body.comment,
        postId: req.body.postId,
        userId: req.body.userId
    })
    try {
        const savedComment = await comment.save() // Save comment
        res.send(savedComment) // Send comment id
    } catch (err) {
        res.status(400).send({message:err}) // Send error if comment cannot be saved
    }
})

// Delete comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await Comment.deleteOne({_id: req.params.commentId}) // Delete comment
        if(removedComment.deletedCount === 0) return res.status(400).send({message:'Comment does not exist'}) // Send error if comment does not exist
        res.send(removedComment) // Send deleted comment
    } catch (err) {
        res.status(400).send({message:err}) // Send error if comment cannot be deleted
    }
})

// Update comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate({_id: req.params.commentId}, {$set: {comment: req.body.comment}}, {new: true}) // Update comment
        res.send(updatedComment) // Send updated comment
    } catch (err) {
        res.status(400).send({message:err}) // Send error if comment cannot be updated
    }
})

module.exports = router // Export router