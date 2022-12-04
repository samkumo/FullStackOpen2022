
const Person = ({ person }) => {
  return (<li key={person.id}>
    {person.name} || {person.number}{' '}</li>
  )
}
export default Person
