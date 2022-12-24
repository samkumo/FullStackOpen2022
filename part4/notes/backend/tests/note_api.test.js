const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

//Initialize test data
beforeEach(async () => {
    await Note.deleteMany({})
    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

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
test('a valid note can be added', async () => {
    //Create new note that we POST to test DB
    const text = 'async/await simplifies making async calls'
    const newNote = {
        content: text,
        important: true
    }
    //POST it
    await api
        .post('/api/notes')
        .send(newNote)
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
        .send(newNote)
        .expect(400)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})
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
test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
})
afterAll(() => {
    mongoose.connection.close()
})