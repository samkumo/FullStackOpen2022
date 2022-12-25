const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true
    }
]

const initialUsers = [
    {
        username: 'samkumo',
        name: 'Samuli Kumo',
        password: '123456'
    },
    {
        username: 'mmeika',
        name: 'Matti Meikäläinen',
        password: 'salasana'
    }
]

//Returns an ID for a note that no longer exists in DB
const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon', date: new Date() })
    await note.save()
    await note.remove()
    return note._id.toString()
}
const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

const nonExistingUser = async () => {
    const user = new User({ username: 'none', name: 'No name', password: 'Nopassword' })
    await user.save()
    await user.remove()
    return user._id.toString()
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
module.exports = {
    initialNotes, nonExistingId, notesInDb,
    initialUsers, nonExistingUser, usersInDb
}