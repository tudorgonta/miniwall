const express = require('express') // Import express

const router = express.Router() // Create router

const User = require('../models/User') // Import user model

const bcrypt = require('bcryptjs') // Import bcryptjs

const jwt = require('jsonwebtoken') // Import jsonwebtoken

const { registerValidation, loginValidation } = require('../validations/validations') // Import validation

// Register
router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body) // Validate data before creating user
    if (error) return res.status(400).send({message:error['details'][0]['message']}) // Send error if validation fails

    // Check if user already exists
    const userExists =  await User.findOne({email: req.body.email})
    if (userExists) return res.status(400).send({message:'User already exists'})
    // Password hashing
    const salt = await bcrypt.genSalt(10) // Generate salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt) // Hash password

    const user = new User({ // Create new user
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save() // Save user
        res.send(savedUser) // Send user id
    } catch (err) {
        res.status(400).send({message:err}) // Send error if user cannot be saved
    }
})

// Login
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body) // Validate data before logging in
    if (error) return res.status(400).send({message:error['details'][0]['message']}) // Send error if validation fails

    const userExists = await User.findOne({email: req.body.email}) // Check if user exists
    if (!userExists) return res.status(400).send({message:'User does not exist'}) // Send error if user does not exist

    const passwordCorrect = await bcrypt.compare(req.body.password, userExists.password) // Check if password is correct
    if (!passwordCorrect) return res.status(400).send({message:'Password is incorrect'}) // Send error if password is incorrect

    const token = jwt.sign({_id: userExists._id}, process.env.JWT_TOKEN) // Create and assign token

    res.header('auth-token', token).send({message:'Logged in', token: token}) // Send token
})

module.exports = router // Export router