require('dotenv').config()

const PORT = process.env.port || 3003
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/blog'
const MONGODB_PW = process.env.MONGODB_PW
const APP = 'blogApp'

module.exports = { PORT, APP, MONGODB_URI, MONGODB_PW }