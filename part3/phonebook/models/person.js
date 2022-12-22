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
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                let valid = false
                console.log(v);
                if (/^\d+$/.test(v)) {
                    valid = true
                }
                if (!valid) {
                    if (/^\d{2}-\d+$/.test(v)) {
                        valid = true
                    }
                }
                if (!valid) {
                    if (/^\d{3}-\d+$/.test(v)) {
                        valid = true
                    }
                }
                return valid
            }
        },
        required: true,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
