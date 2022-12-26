const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const userId = process.env.userId
const token = process.env.TOKEN
//Initialize test data
beforeEach(async () => {
    await Note.deleteMany({})
    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
})
describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 10000)

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')
        const contents = response.body.map(r => r.content)
        expect(contents).toContain('Browser can execute only Javascript')
    })
})

describe('addition of a new note', () => {
    test('a valid note can be added', async () => {

        //Create new note that we POST to test DB
        const text = 'async/await simplifies making async calls'
        const users = await helper.usersInDb()
        const newNote = {
            content: text,
            important: true,
            userId: users[0].id
        }
        //POST it
        await api
            .post('/api/notes')
            .set('Authorization', 'bearer ' + token)
            .send(newNote, userId)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        //Read back to make sure it was saved in DB
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
        const contents = notesAtEnd.map(r => r.content)
        expect(contents).toContain(text)
    })
    test('note without content is not added', async () => {
        const newNote = {
            important: true
        }
        //Attempt to POST it
        await api
            .post('/api/notes')
            .set('Authorization', 'bearer ' + token)
            .send(newNote)
            .expect(400)
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})
describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
        expect(resultNote.body).toEqual(processedNoteToView)
    })
})
describe('deletion of a note', () => {
    test('SUCCESS with status code 204 if ID is valid', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .set('Authorization', 'bearer ' + token)
            .expect(204)
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    })
    test('FAIL with status code 400 if ID is invalid', async () => {
        const invalidNote = await helper.nonExistingId()
        await api
            .delete(`/api/notes/${invalidNote}`)
            .set('Authorization', 'bearer ' + token)
            .expect(400)
    })
})
afterAll(() => {
    mongoose.connection.close()
})