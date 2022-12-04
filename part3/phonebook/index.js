const http = require("http")
const PORT = 3001
const express = require("express")
const { allowedNodeEnvironmentFlags } = require("process")
const { generateKey } = require("crypto")
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
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
app.post("/api/persons", (request, response) => {
    //Validate that message is not empty
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: "content missing" })
    }

    //Create person entry
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
})

//
// Helper functions
//
const generateId = () => {
    return Math.floor(Math.random() * 100000)
}

//
// Run
//
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
})

