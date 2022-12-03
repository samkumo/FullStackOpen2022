import personService from '../services/persons'

const deletePerson = (event, person) => {
  //TODO: Confirmation popup needed before
  event.preventDefault()
  personService.deletePerson(person.id).then(() => {
    // console.log(person.name + ' removed from phonebook')
  })
}

const Person = ({ person }) => {
  return (
    <div>
      {person.name} || {person.number}{' '}
      <button
        onClick={(event) => {
          if (window.confirm('Delete this person?')) {
            deletePerson(event, person)
          }
        }}
      >
        delete
      </button>
    </div>
  )
}
export default Person
