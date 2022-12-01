const Person = ({ person }) => {
  return (
    <div>
      {person.name} || {person.number} <button>Delete</button>
    </div>
  )
}
export default Person
