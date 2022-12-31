const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const url = config.MONGODB_URI.replace('<password>', config.MONGODB_PW).replace('<app>', config.APP)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(url)
    .then(() => { logger.info('connected to MongoDB') })
    .catch((error) => { logger.error('error connection to MongoDB:', error.message) })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testingRouter')
    app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app