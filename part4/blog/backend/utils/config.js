const { env } = require("process");

const PORT = env.port || 3003
const MONGODB_URI = env.MONGODB_URI || 'mongodb://localhost/blog'
const MONGODB_PW = env.MONGODB_PW
const APP = 'blogApp'

module.exports = { PORT, APP, MONGODB_URI, MONGODB_PW }