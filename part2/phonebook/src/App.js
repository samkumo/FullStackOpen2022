import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/persons'

const SubmitForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div>
          name:
          <input
            value={props.newName}
            onChange={props.handleNameChange}
          ></input>
        </div>
        <div>
          number:
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          ></input>
        </div>
        <div>
          <button type="submit" onSubmit={props.addName}>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return (
    <form onSubmit={props.filterNames}>
      <div>
        filter shown with
        <input value={props.filter} onChange={props.handleFilterChange}></input>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return persons.map((person) => (
    <Person key={person.id} person={person}></Person>
  ))
}

const App = () => {
  //Complete list of all added people
  const [persons, setPersons] = useState([])
  const [filterPersons, setFilterPersons] = useState(persons) //Filtered people list
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //Read all entries from DB
  /*   
  const hook = () => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
      setFilterPersons(response.data)
    })
  }
  useEffect(hook, []) 
  */
  //Read all entries from DB, using service
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  })

  //Add new person to phonebook
  const addName = (event) => {
    event.preventDefault()
    if (isNameEmpty(newName)) {
      return
    }
    if (isNameDuplicate(newName)) {
      alert(`${newName} is already added to the phonebook!`)
      return
    }
    console.log('persons.lenght:', persons.length)
    const personObject = {
      //id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })

    //Reset filter so we can definitely see that new person was added
    setFilter('')
    setFilterPersons(persons.concat(personObject))
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
  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }
  const filterNames = (event) => {
    event.preventDefault()
    setFilterPersons(
      persons.filter(function (person) {
        return person.name.toUpperCase().includes(filter.toUpperCase())
      })
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {
        <Filter
          filterNames={filterNames}
          filter={filter}
          handleFilterChange={handleFilterChange}
        ></Filter>
      }
      <h2>Add a new</h2>
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
        <Persons persons={filterPersons}></Persons>
      </div>
    </div>
  )
}

export default App
