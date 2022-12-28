const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    blog ? response.json(blog) : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).end()
    }
    const user = await User.findById(request.user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0, //Optional: default 0
        user: request.user
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) { return response.status(204).end() }
    if (blog.user === null || request.user === null) {
        return response.status(400).end()
    }
    if (blog.user.toString() === request.user.toString()) {
        //Blog can only be deleted by the original user
        await blog.delete()
        return response.status(202).end()
    } else {
        return response.status(401).end() //unauthorized
    }
})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (request.params.id === undefined || request.body === undefined) {
        return response.status(400).end()
    }
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    updatedBlog ? response.status(200).json(updatedBlog) : response.status(400).end()
})

module.exports = blogsRouter