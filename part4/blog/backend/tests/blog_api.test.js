const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

//Initialize test data before each test
beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

//Tests
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 10000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all blogs have defined ID', async () => {
    const blogsInDb = await helper.blogsInDb()
    blogsInDb.map(blog => expect(blog.id).toBeDefined())
})
test('new blog can be added', async () => {
    const blogsPrev = await helper.blogsInDb()
    const newBlog = {
        title: 'Blog added via test',
        author: 'Tester',
        url: 'www.fullstackopen.com',
        likes: 2
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    //Readback to verify new blog was added to DB
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAfter.map(r => r.title)
    expect(titles).toContain(newBlog.title)
})

afterAll(() => mongoose.connection.close())
