const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const requestLogger = require('../utils/middleware')

blogsRouter.get('/blogs', (request, response) => {
    Blog.find({}).then(result => {
        response.json(result)
    })
})

blogsRouter.get('/blogs/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(result => {
            result ? response.json(result) : response.status(404).end()
        })
        .catch(error => next(error))
})

blogsRouter.post('/blogs', (request, response) => {
    const blog = new Blog(request.body)
    blog.save()
        .then(result => { response.status(201).json(result) })
})

module.exports = blogsRouter