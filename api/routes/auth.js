const express = require('express')
const router = express.Router()
const {login, register, getUser} = require('../controllers/authController')

router.post('/api/login', login)
router.post('/api/register', register)
router.get('/api/me', getUser)

module.exports = router