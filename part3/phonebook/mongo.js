const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

const mode = process.argv.length === 5 ? 'INSERT' : 'READ'

const password = process.argv[2]
const url = `mongodb+srv://samkumo:${password}@cluster0.cngc7ai.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (mode == 'INSERT') {
    //Insert new entry
    mongoose.connect(url)
        .then((result) => {
            console.log('connected');
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4],
            })
            return person.save()
        })
        .then(() => {
            console.log(`Added ${process.argv[3]}, number ${process.argv[4]} to the phonebook`);
            mongoose.connection.close()
        })
        .catch((err) => console.log(err))

} else {
    //Read all entries
    mongoose.connect(url)
        .then((result) => {
            console.log('connected');
            console.log('phonebook:');
            Person.find({})
                .then(result => {
                    result.forEach(person => console.log(`${person._id} ${person.name} ${person.number}`))
                    mongoose.connection.close()
                })
        })
        .catch((err) => console.log(err));
}