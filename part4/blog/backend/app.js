const config = require('./utils/config')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const url = config.MONGODB_URI.replace('<password>', config.MONGODB_PW).replace('<app>', config.APP)
logger.info('connecting to', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => { logger.info('connected to MongoDB') })
    .catch((error) => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
