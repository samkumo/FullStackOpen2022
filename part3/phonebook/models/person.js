const mongoose = require('mongoose')
const baseUrl = process.env.MONGODB_URI
const pw = process.env.MONGODB_PW
const app = 'phonebookApp'
const urltmp = baseUrl.replace('<password>', pw)
const url = urltmp.replace('<app>', app)

//This needs to be set or Fly.io complains
mongoose.set('strictQuery', false)

//Connect to DB
mongoose.connect(url)
    .then(result => console.log('connected to MongoDB'))
    .catch(err => console.log('error connecting to MongoDB:', err.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
