const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

//GET all notes
notesRouter.get('/', async (request, response) => {
    const notes = await Note
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(notes)
})

//GET specific note by ID
notesRouter.get('/:id', async (request, response) => {
    const note = await Note
        .findById(request.params.id)
        .populate('user', { username: 1, name: 1 })
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

//POST New note
notesRouter.post('/', async (request, response) => {
    const body = request.body
    if (!request.user || !request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!body.content) {
        return response.status(400).end()
    }

    const user = await User.findById(request.user)
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: request.user
    })
    const savedNote = await note.save()

    //Save note reference to user aswell
    user.notes.concat(savedNote.id)
    await user.save()
    response.status(201).json(savedNote)
})

//DELETE Note by ID
notesRouter.delete('/:id', async (request, response) => {
    if (!request.user || !request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!request.params.id) {
        return response.status(400).end()
    }
    const deleted = await Note.findByIdAndDelete(request.params.id)
    deleted ? response.status(204).end() : response.status(400).end()
})

//PUT Update Note
notesRouter.put('/:id', async (request, response) => {
    const body = request.body
    if (!request.user || !request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!body.content) {
        return response.status(400).end()
    }

    /*     const note = {
            content: body.content,
            important: body.important
        } */
    const note = await Note.findById(request.params.id)
    if (note.user.toString() === request.user.toString()) {
        note.content = body.content
        note.important = body.important
        const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
        response.json(updatedNote)
    } else {
        response.status(401).end()
    }
})

module.exports = notesRouter