const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { content: 1, date: 1 })
    response.json(users)
})
usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id).populate('notes', { content: 1, date: 1 })
    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const existingUser = await User.findOne({ username })
    if (existingUser) { return response.status(400).json({ error: 'Name already taken' }) }
    if (username.length === 0 || password.length === 0) {
        return response.status(400).json({ error: 'Username or password cannot be empty' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})
module.exports = usersRouter
