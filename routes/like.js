const express = require('express') // Import express

const router = express.Router() // Create router

const Like = require('../models/Like') // Import like model
const Post = require('../models/Post') // Import post model

const { likeValidation } = require('../validations/validations') // Import validation

// Get all like by postId
router.get('/:postId', async (req, res) => {
    try {
        const likes = await Like.find({postId: req.params.postId}) // Find all likes by postId
        res.send(likes) // Send likes
    } catch (err) {
        res.status(400).send({message:err}) // Send error if likes cannot be found
    }
})

// Create a like
router.post('/', async (req, res) => {
    // Check if post of the userId, then return error because cant like own post
    const checkOwnPost = await Post.findOne({_id: req.body.postId, userId: req.body.userId})
    if (checkOwnPost) return res.status(400).send({message:'Can not like own post'})

    const { error } = likeValidation(req.body) // Validate data before creating like
    if (error) return res.status(400).send({message:error['details'][0]['message']}) // Send error if validation fails
    const like = new Like({ // Create new like
        postId: req.body.postId,
        userId: req.body.userId
    })
    try {
        const savedLike = await like.save() // Save like
        res.send(savedLike) // Send like id
    } catch (err) {
        res.status(400).send({message:err}) // Send error if like cannot be saved
    }
})

// Delete like
router.delete('/:likeId', async (req, res) => {
    try {
        const removedLike = await Like.deleteOne({_id: req.params.likeId}) // Delete like
        res.send(removedLike) // Send deleted like
    } catch (err) {
        res.status(400).send({message:err}) // Send error if like cannot be deleted
    }
})

module.exports = router // Export router
