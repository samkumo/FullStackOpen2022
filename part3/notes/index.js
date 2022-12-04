const http = require("http")
const PORT = 3001
const express = require("express")
const app = express()

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

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})
app.get("/api/notes", (request, response) => {
    response.json(notes)
})

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
})

/* const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

app.listen(PORT)
console.log('Server running on port ${PORT}'); */