import { useState } from 'react'

//Separate component 1: Submission form
const SubmitForm = (prop) => {
  return (
    <div>
      <form onSubmit={prop.addName}>
        <div>
          name:
          <input value={prop.newName} onChange={prop.handleNameChange}></input>
        </div>
        <div>
          number:
          <input
            value={prop.newNumber}
            onChange={prop.handleNumberChange}
          ></input>
        </div>
        <div>
          <button type="submit" onSubmit={prop.addName}>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
//Separated component 2: List of people
const Persons = ({ persons }) => {
  return persons.map((person) => (
    <Person key={person.key} person={person}></Person>
  ))
}
//Separated component 2: Component for rendering single person
const Person = ({ person }) => {
  return (
    <div>
      {person.name} || {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { key: 0, name: 'Arto Hellas', number: '040-123456' },
    { key: 1, name: 'Ada Lovelace', number: '39-44-5323523' },
    { key: 2, name: 'Dan Abramov', number: '12-43-234345' },
    { key: 3, name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    //Validate new name value
    if (isNameEmpty(newName)) {
      return
    }
    if (isNameDuplicate(newName)) {
      alert(`${newName} is already added to the phonebook!`)
      return
    }
    const personObject = {
      key: persons.length,
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const isNameDuplicate = (newName) => {
    const duplicates = persons.filter((person) => person.name === newName)
    return duplicates.length !== 0 //Returns TRUE if duplicates found
  }
  const isNameEmpty = (name) => {
    return name === '' // Returns TRUE if name is initial
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {
        <SubmitForm
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addName={addName}
          newName={newName}
          newNumber={newNumber}
        ></SubmitForm>
      }
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons}></Persons>
      </div>
    </div>
  )
}

export default App
