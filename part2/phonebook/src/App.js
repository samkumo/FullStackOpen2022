import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/persons'
import SubmitForm from './components/Submitform'
import Filter from './components/Filter'
import NotificationSuccess from './components/NotificationSuccess'
import NotificationError from './components/NotificationError'


const App = () => {
  //Complete list of all added people
  const [persons, setPersons] = useState([])
  const [personsFilter, setPersonsFilter] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState()
  const [notificationSuccess, setNotificationSuccess] = useState()
  const [notificationError, setNotificationError] = useState()


  //Read all entries from DB, using service
  useEffect(() => {
    personService.getAll().then((response) => {
      //Set the array containing all people in phonebook
      setPersons(response)

      //Set filtered array that is displayed to user
      if (filter === '') {
        setPersonsFilter(response)
      } else {
        setPersonsFilter(response.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase())))
      }
    })
  }, [])

  //
  // Add and Delete persons
  //
  const addName = (event) => {
    event.preventDefault()
    if (newName === '') {
      return
    }
    const personObject = {
      //id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    //Check if name already exists in phonebook
    if (persons.filter((person) => person.name === newName).length !== 0) {
      if (window.confirm(personObject.name + " is already added to the phonebook, replace the old number?")) {
        const updatedPersons = persons
        updatedPersons.map(person => {
          if (person.name === personObject.name) {
            person.number = personObject.number
            personService.update(person.id, person)
          }
        })
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
        setFilter('')
        return
      }
    } else {
      //Add the new person to runtime arrays
      setPersons(persons.concat(personObject))
      setPersonsFilter(personsFilter.concat(personObject))
      setNewName('')
      setNewNumber('')

      //Also push the new person to DB and display notification
      personService.create(personObject).then(response => {
        console.log("Person added: ", personObject.name);
        setNotificationSuccess("Person added :" + personObject.name)
        setTimeout(() => setNotificationSuccess(null), 5000)
      })
      return
    }
  }
  const deletePerson = (event, person) => {
    event.preventDefault()

    //Remove person from runtime arrays
    setPersons(persons.filter(x => x.id !== person.id))
    setPersonsFilter(personsFilter.filter(x => x.id !== person.id))

    //Also remove the person from DB
    personService.deletePerson(person.id)
      .then(() => console.log("Deleted: ", person.name))
      .catch(() => {
        //Display error
        setNotificationError(person.name + " has already been remove from the server!")
        setTimeout(() => setNotificationError(null), 5000)
      });
  }

  //
  // Filter displayed persons
  //
  const filterNames = (event) => {
    event.preventDefault()
    const filtered = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    setPersonsFilter(filtered)
  }

  const Persons = ({ persons }) => {
    return persons.map((person) => (
      <ul key={"P" + person.id}>
        <Person key={person.id} person={person}></Person>
        <button key={"BTN" + person.id}
          onClick={(event) => {
            if (window.confirm('Delete this person?')) {
              deletePerson(event, person)
            }
          }}
        >delete</button>
      </ul>
    ))
  }


  //
  // Handlers
  //
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

  //
  // Main
  //
  return (
    <div>
      <h1>Phonebook</h1>
      <NotificationSuccess message={notificationSuccess}></NotificationSuccess>
      <NotificationError message={notificationError}></NotificationError>
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
        <Persons persons={personsFilter}></Persons>
      </div>
    </div>
  )
}

export default App
