const notesRouter = require('express').Router()
const Note = require('../models/note')

//GET all notes
notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes.toJSON())
    })
})

//GET specific note by ID
notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

//POST New note
notesRouter.post('/', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    note.save()
        .then(savedNote => {
            response.json(savedNote.toJSON())
        })
        .catch(error => next(error))
})

//DELETE Note by ID
notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//PUT Update Note
notesRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})

module.exports = notesRouter