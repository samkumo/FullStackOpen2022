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

const Notification = ({ message }) => {
  if (message === null || message === "" || message === undefined) {
    return null
  }
  return (<div className='success'>{message}</div>)
}
const ErrorMessage = ({ message }) => {
  if (message === null || message === "" || message === undefined) {
    return null
  }
  return (
    <div className='error'>message</div>
  )
}

const App = () => {
  //Complete list of all added people
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState()


  //Read all entries from DB, using service
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      if (filter === '') {
        setPersons(initialPersons)
      } else {
        setPersons(
          initialPersons.filter((person) =>
            person.name.toUpperCase().includes(filter.toUpperCase())
          )
        )
      }
    })
  }, [filter])

  //Add new person to phonebook
  const addName = (event) => {
    event.preventDefault()
    if (isNameEmpty(newName)) {
      return
    }
    console.log('persons.lenght:', persons.length)
    const personObject = {
      //id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    //Name already exists in phonebook
    if (isNameDuplicate(personObject.name)) {
      console.log("duplicate name");
      //alert(`${personObject.name} is already added to the phonebook!`)
      if (window.confirm(personObject.name + " is already added to the phonebook, replace the old number?")) {
        console.log("before", persons);
        const tempPersons = persons
        persons.map(person => {
          if (person.name === personObject.name) {
            person.number = personObject.number
            personService.update(person.id, person)
          }
        })
        setPersons(tempPersons)
        setNewName('')
        setNewNumber('')
        return
      }
    }
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotification(personObject.name + " added!")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    //Reset filter so we can definitely see that new person was added
    setFilter('')


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

    personService.getAll().then((response) => {
      const filtered = response.filter((person) => {
        if (person.name.toUpperCase().includes(filter.toUpperCase())) {
          return person
        }
      })
      setPersons(filtered)
    })
  }

  const Persons = ({ persons }) => {
    return persons.map((person) => (
      <div key={"P" + person.id}>
        <Person key={person.id} person={person}></Person>
        <button key={"BTN" + person.id}
          onClick={(event) => {
            if (window.confirm('Delete this person?')) {
              deletePerson(event, person)
            }
          }}
        >delete</button>
      </div>
    ))
  }
  const deletePerson = (event, person) => {
    event.preventDefault()
    personService.deletePerson(person.id).then(personService.getAll().then(response => {
      setPersons(response)
    }))
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification}></Notification>
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
        <Persons persons={persons}></Persons>
      </div>
    </div>
  )
}

export default App
