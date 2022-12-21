// THIS IS THE BACKEND
const PORT = process.env.PORT || 3001
const express = require("express")
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
// Routes
//
app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})
app.get("/api/notes", (request, response) => {
    //response.json(notes)
    Note.find({}).then(result => {
        notes = result
        response.json(result)
    })
})
app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    //const note = notes.find(note => note.id === id)
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
    //note ? response.json(note) : response.status(404).end("Resource not found!")
})
app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    Note.findByIdAndDelete(response.params.id)
        .then(result => console.log('Note deleted from MongoDB!'))
        .catch((err) => console.log('error deleting from DB: ', err.message))
    //notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})
app.post("/api/notes", (request, response) => {
    //Validate that message is not empty
    const body = request.body
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
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

//
// Helper functions
//
/*
const generateId = () => {
    return notes.length > 0
        ? Math.max(...notes.map(n => n.id)) + 1 : 0
}
*/

//
// Run
//
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
