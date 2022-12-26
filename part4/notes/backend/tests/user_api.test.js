const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

//Initialize test data
beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialUsers.map(u => new User(u))
    const promiseArray = userObjects.map(u => u.save())
    await Promise.all(promiseArray)
})

describe('reading users from Db', () => {
    test('users are returned as JSON', async () => {
        await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
    })
    test('get all users from Db', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
    test('get specific user from Db', async () => {
        const username = helper.initialUsers[0].username
        const user = await api.get(`/api/users/${username}`)
        expect(user === helper.initialUsers[0])
    })
    test('fails when looking up non-existing user', async () => {
        const username = helper.nonExistingUser()
        await api.get(`/api/users/${username}`).expect(400)
    })
})
describe('writing users into DB', () => {
    test('add new user', async () => {
        const newUser = {
            username: 'kpekka',
            name: 'Pekka Koodari',
            password: 'salainenpw',
        }
        await api.post('/api/users').send(newUser).expect(201)
    })
    test('duplicate user cannot be added', async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            username: usersBefore[0].username,
            name: 'duplicate',
            password: 'password'
        }
        await api.post('/api/users').send(newUser).expect(400)
    })
})