//THIS IS THE BACKEND

const http = require("http")
const PORT = process.env.PORT || 3001
const express = require("express")
const { allowedNodeEnvironmentFlags } = require("process")
const { generateKey } = require("crypto")
const morgan = require("morgan")
const app = express()
const cors = require("cors")
require('dotenv').config()
const Person = require('./models/person')

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
// Middleware functions
//
const requestLogger = (request, response, next) => {
    console.log("Method: ", request.method);
    console.log("Path: ", request.path);
    console.log("Body: ", request.body);
    console.log("---");
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

// Morgan
//morgan('tiny')
//morgan(':method :url :status - :response-time ms')
//app.use(morgan('tiny'))
morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status - :res[Content-Length] :response-time ms :body'))



//
// Initialize middleware
//
app.use(express.json())
app.use(requestLogger)
//app.use(unknownEndpoint)
app.use(cors())
app.use(express.static('build'))
app.use(errorHandler)

//
// Routes
//
app.get("/api/persons", (request, response, next) => {
    Person.find({}).then(result => {
        persons = result
        response.json(result)
    })
})
app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})
app.get("/info", (request, response) => {
    const msg = `Phonebook has info for ${Person.length} people <br> ${new Date()}`
    response.send(msg)
})
app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})
app.post("/api/persons", (request, response, next) => {
    //Validate that message is not empty
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: "Name and phonenumber required!" })
    }

    //Create person entry
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(result => response.json(result))
})
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


//
// Run
//
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


