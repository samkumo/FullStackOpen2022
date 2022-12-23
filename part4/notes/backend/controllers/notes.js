const notesRouter = require('express').Router()
const Note = require('../models/note')
const logger = require('../utils/logger')

//GET all notes
notesRouter.get('/', (request, response) => {
    logger.info('GET')
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

//GET specific note by ID
notesRouter.get('/:id', (request, response, next) => {
    logger.info('GET:ID')
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

//POST New note
notesRouter.post('/', (request, response, next) => {
    logger.info('POST')
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})

//DELETE Note by ID
notesRouter.delete('/:id', (request, response, next) => {
    logger.info('DELETE')
    Note.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//PUT Update Note
notesRouter.put('/:id', (request, response, next) => {
    logger.info('PUT')
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter