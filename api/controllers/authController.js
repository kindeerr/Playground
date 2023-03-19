const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @route   POST api/register
// @desc    Register user
// @access  Public

const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    // Check for existing user
    const existingUser = await User.findOne({email})
    if (existingUser) {
        res.status(400)
        throw new Error('User already exists')
    } else {

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})

// @route   POST api/login
// @desc    Login user
// @access  Public

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    // Check for existing user
    const user = await User.findOne({email})
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @route   Get api/me
// @desc    Get logged in user
// @access  Private

const getUser = asyncHandler(async (req, res) => {
    res.send('get all users')
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    register,
    login,
    getUser,
    generateToken,
}