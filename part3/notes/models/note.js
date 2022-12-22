const mongoose = require('mongoose')
const baseUrl = process.env.MONGODB_URI
const pw = process.env.MONGODB_PW
const app = 'noteApp'
const url = baseUrl.replace('<password>', pw).replace('<app>', app)

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.log('error connecting to MongoDB:', err.message);
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)