const blogsRouter = require('express').Router()
const notesRouter = require('../../../notes/backend/controllers/notes')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

notesRouter.get('/api/blogs', (request, response) => {
    Blog.find({}.then(blogs => {
        response.json(blogs)
    }))
})

notesRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
    blog.save()
        .then(result => { response.status(201).json(result) })
})
