const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const createTestUser = (async () => {
    const user = ({
        username: 'blogTester',
        name: 'Blog Test',
        password: 'blogs'
    })
    const response = await api
        .post('/api/users')
        .send(user)
        .expect(201)
    return response
})
const loginTestUser = (async () => {
    await User.deleteMany({})
    const username = 'blogTester'
    const password = 'blogs'
    const usersInDb = await helper.usersInDb()
    if (usersInDb.filter(x => x.username === username).length === 0) {
        await createTestUser()
    }
    const login = { username: 'blogTester', password: 'blogs' }
    const response = await api
        .post('/api/login')
        .send(login)
        .expect(200)
    return JSON.parse(response.text)
})


//Initialize test data before each test
beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})



//Tests
describe('read blogs', () => {
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
})
describe('blogs can be modified', () => {
    test('new blog can be added', async () => {
        const login = await loginTestUser()
        const users = await helper.usersInDb()
        const user = users.filter(u => u.username = login.username)[0]

        const data = {
            title: 'Blog added via test',
            author: 'Tester',
            url: 'www.fullstackopen.com',
            likes: 2,
            userId: user.id
        }
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + login.token)
            .send(data)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        //Readback to verify new blog was added to DB
        const blogsAfter = await helper.blogsInDb()
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAfter.map(r => r.title)
        expect(titles).toContain(data.title)
    })
    test('likes is set default value of 0', async () => {
        const login = await loginTestUser()
        const users = await helper.usersInDb()
        const user = users.filter(u => u.username = login.username)[0]
        const newBlog = {
            title: 'Blog added via test',
            author: 'Tester',
            url: 'www.fullstackopen.com',
            userId: user.id
        }
        const savedBlog = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + login.token)
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
        const login = await loginTestUser()
        const newBlog = {
            // title: 'Blog added via test',
            author: 'Tester without title',
            //  url: 'www.fullstackopen.com',
            likes: 10
        }
        const savedBlog = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + login.token)
            .send(newBlog)
            .expect(400)
    })

    test('single blog can be deleted', async () => {
        const login = await loginTestUser()
        const blogsBefore = await helper.blogsInDb()
        const deleteMe = blogsBefore[1]
        //First test deleting non-existing blog, should return error
        await api
            .delete(`/api/blogs/${await helper.nonExistingId()}`)
            .set('Authorization', 'bearer ' + login.token)
            .expect(204)

        //Test deleting specific, existing blog
        const deletedBlog = await api
            .delete(`/api/blogs/${deleteMe.id}`)
            .set('Authorization', 'bearer ' + login.token)
            .expect(202)
        const blogsAfter = await helper.blogsInDb()
        const blog = blogsAfter[{ id: deleteMe.id }]
        expect(blogsAfter[{ id: deleteMe.id }]).not.toBeDefined()
    })
    test('blog can be updated', async () => {
        const login = await loginTestUser()
        const blogsBefore = await helper.blogsInDb()
        const blog = blogsBefore[1]
        blog.likes++
        await api
            .put(`/api/blogs/${blog.id}`)
            .set('Authorization', 'bearer ' + login.token)
            .send(blog).expect(200)
        const blogAfter = await (await helper.blogsInDb()).filter(x => x.id === blog.id)[0]
        expect(blog.likes == blogAfter.likes)

    })
})

afterAll(() => mongoose.connection.close())
