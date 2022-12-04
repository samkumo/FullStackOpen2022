const http = require("http")
const PORT = 3001
const express = require("express")
const { allowedNodeEnvironmentFlags } = require("process")
const app = express()

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

//
// Initialize
//
app.use(express.json())

//
// Routes
//
app.get("/api/persons", (request, response) => response.json(persons))
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    person ? response.json(person) : response.status(404).end("Resource not found")
})
app.get("/info", (request, response) => {
    const msg = "Phonebook has info for " + persons.length + " people <br>" + new Date()
    response.send(msg)
})


//
// Run
//
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
})

