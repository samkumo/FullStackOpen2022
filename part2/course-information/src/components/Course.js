const Header = ({ course }) => <h1>{course.name}</h1>
//const Total = ({ sum }) => <p>Number of exercises {sum}</p>

//Individual list item describing a part of the course
const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  )
}

//Contents with a list of course parts
const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </ul>
  )
}

//Main structure
const Course = ({ course }) => {
  return (
    <>
      <Header course={course}></Header>
      <Content course={course}></Content>
    </>
  )
}
export default Course
