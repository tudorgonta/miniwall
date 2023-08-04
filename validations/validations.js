// import joi
const Joi = require('joi')

// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

// Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

// Post validation
const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(6).required(),
        description: Joi.string().min(6).required(),
        userId: Joi.string().required()
    })
    return schema.validate(data)
}

// Comment validation
const commentValidation = (data) => {
    const schema = Joi.object({
        comment: Joi.string().min(6).required(),
        postId: Joi.string().required(),
        userId: Joi.string().required()
    })
    return schema.validate(data)
}

// Like validation
const likeValidation = (data) => {
    const schema = Joi.object({
        postId: Joi.string().required(),
        userId: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation
module.exports.commentValidation = commentValidation
module.exports.likeValidation = likeValidation

