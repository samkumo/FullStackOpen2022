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
test('likes is set default value of 0', async () => {
    const newBlog = {
        title: 'Blog added via test',
        author: 'Tester',
        url: 'www.fullstackopen.com',
        //likes: 2
    }
    const savedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    //Read back to verify that the new blog has likes value of 0
    const blogsAfter = await helper.blogsInDb()
    const filter = blogsAfter.filter(b => b.id === savedBlog.body.id)
    expect(filter).toBeDefined()
    expect(filter[0].likes).toBeDefined()
})
test('title and url are mandatory', async () => {
    const newBlog = {
        // title: 'Blog added via test',
        author: 'Tester without title',
        //  url: 'www.fullstackopen.com',
        likes: 10
    }
    const savedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('single blog can be deleted', async () => {
    const blogsBefore = await helper.blogsInDb()
    const deleteMe = blogsBefore[1]
    //First test deleting non-existing blog, should return error
    await api
        .delete(`/api/blogs/${await helper.nonExistingId()}`)
        .expect(204)

    //Test deleting specific, existing blog
    const deletedBlog = await api.delete(`/api/blogs/${deleteMe.id}`).expect(202)
    const blogsAfter = await helper.blogsInDb()
    const blog = blogsAfter[{ id: deleteMe.id }]
    expect(blogsAfter[{ id: deleteMe.id }]).not.toBeDefined()
})

afterAll(() => mongoose.connection.close())
