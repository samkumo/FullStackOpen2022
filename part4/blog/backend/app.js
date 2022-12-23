const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
//const app = require('../../notes/backend/app')
const url = config.MONGODB_URI.replace('<password>', config.MONGODB_PW).replace('<app>', config.APP)

logger.info('connecting to', config.MONGODB_URI)
mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => { logger.info('connected to MongoDB') })
    .catch((error) => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
//app.use(express.static('build'))
app.use(express.json)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
