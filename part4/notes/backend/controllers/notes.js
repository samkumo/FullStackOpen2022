const notesRouter = require('express').Router()
const Note = require('../models/note')
const logger = require('../utils/logger')


//GET all notes
notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

//GET specific note by ID
notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

//POST New note
notesRouter.post('/', async (request, response) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    const savedNote = await note.save()
    response.status(201).json(savedNote)
})

//DELETE Note by ID
notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

//PUT Update Note
notesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote)
})

module.exports = notesRouter