// THIS IS THE BACKEND
const PORT = process.env.PORT || 3001
const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config()
const Note = require('./models/note')

// npm run dev

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

//
// Initialize
//
app.use(express.json())
app.use(cors())           //Enable Cross-Origin Resource Sharing
app.use(express.static('build'))

//
// Error handler middleware
//
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

//
// Routes
//
app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})
app.get("/api/notes", (request, response) => {
    Note.find({}).then(result => {
        notes = result
        response.json(result)
    })
})
app.get("/api/notes/:id", (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            note ? response.json(note.toJSON()) : response.status(404).end()
        })
        .catch(error => next(error))
})
app.delete("/api/notes/:id", (request, response, next) => {
    Note.findByIdAndDelete(response.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})
app.post("/api/notes", (request, response, next) => {
    //Validate that message is not empty
    const body = request.body
    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    if (!body.content) {
        return response.status(400).json({
            error: "content missing"
        })
    }
    //Create note object
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    note.save()
        .then(savedNote => {
            response.json(savedNote.toJSON())
        })
        .catch(error => next(error))
})
app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})

//
// Run
//
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
