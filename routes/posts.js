const express = require('express') // Import express
const router = express.Router() // Create router
const Post = require('../models/Post') // Import post model
const Comment = require('../models/Comment') // Import comment model
const Like = require('../models/Like') // Import like model
const { postValidation } = require('../validations/validations') // Import validation

// Get all posts
router.get('/', async (req, res) => {
    try {
        // Get Popular posts, sort by number of likes and date created
        const popularPosts = await Post.aggregate([
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    userId: 1,
                    likes: 1,
                    likeCount: { $size: '$likes' }
                }
            },
            {
                $sort: {
                    likeCount: -1,
                    createdAt: -1
                }
            }
        ])

        res.json(popularPosts) // Send posts
    } catch (err) {
        res.json({message: err}) // Send error if posts cannot be found
    }
})

// Get specific post by id
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId) // Find post by id
        res.json(post) // Send post
    } catch (err) {
        res.json({message: err}) // Send error if post cannot be found
    }
})

// Create post
router.post('/', async (req, res) => {
    const { error } = postValidation(req.body) // Validate data before creating post
    if (error) return res.status(400).send({message:error['details'][0]['message']}) // Send error if validation fails

    const post = new Post({ // Create new post
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    })
    try {
        const savedPost = await post.save() // Save post
        res.json(savedPost) // Send post back to client
    } catch (err) {
        res.json({message: err}) // Send error if post cannot be saved
    }
})

// Delete post
router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId
    try {
        // Remove post by id using findbyidandremove
        const removedPost = await Post.findByIdAndRemove(postId)
        if(removedPost) {
            await Comment.deleteMany({postId: postId}) // Delete all comments of the post
            // Find all likes that have the postId === postId
            await Like.deleteMany({postId: postId}) // Delete all likes of the post
        }
        res.json(removedPost) // Send removed post
    } catch (err) {
        res.json({message: 'error'}) // Send error if post cannot be removed
    }
})

// Update post
router.patch('/:postId', async (req, res) => {
    try {
        // Update using saveandupdate by id
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId, 
            {$set: {title: req.body.title, description: req.body.description}},
            {new: true}
            ) // Update post by id
        res.json(updatedPost) // Send updated post
    } catch (err) {
        res.json({message: err}) // Send error if post cannot be updated
    }
})

// export
module.exports = router