import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ key: 0, name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

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
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  const isNameDuplicate = (name) => {
    const duplicates = persons.filter((person) => person.name === name)
    return duplicates.length !== 0 //Returns TRUE if duplicates found
  }
  const isNameEmpty = (name) => {
    return name === '' // Returns TRUE if name is initial
  }
  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onSubmit={addName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return <div key={person.key}>{person.name}</div>
        })}
      </div>
      <p>debug newName: {newName}</p>
    </div>
  )
}

export default App
