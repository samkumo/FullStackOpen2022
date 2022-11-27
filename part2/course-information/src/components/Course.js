const Header = ({ course }) => <h1>{course.name}</h1>

//Display the total number of exercises in the given course
const Total = ({ course }) => {
  const sum = course.parts.reduce(function (sum, part) {
    return sum + part.exercises
  }, 0)
  return <div>Total of {sum} exercises</div>
}

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
      <Total course={course}></Total>
    </>
  )
}
export default Course
