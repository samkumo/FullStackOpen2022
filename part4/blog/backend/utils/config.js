require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_PW = process.env.MONGODB_PW
const APP = process.env.NODE_ENV === 'test'
    ? 'blogAppTest'
    : 'blogApp'

module.exports = { PORT, MONGODB_URI, MONGODB_PW, APP }