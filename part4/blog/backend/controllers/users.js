const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { content: 1, date: 1 })
    response.json(users)
})
usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id).populate('blogs', { content: 1, date: 1 })
    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    //Check that name is unique
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({ error: 'Name already taken' })
    }
    if (username.length < 2 || password.length < 2) {
        return response.status(400).json({ error: 'Name and password must contain at least 3-characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})
module.exports = usersRouter
