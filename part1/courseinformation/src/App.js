const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}
const Content = (prop) => {
  return(
    <>
    <Part part={prop.course.parts[0]}/>
    <Part part={prop.course.parts[1]}/>
    <Part part={prop.course.parts[2]}/>
    </> 
  )
}
const Part = (prop) => {
  return(
    <div>
      <p>{prop.part.name} {prop.part.exercises}</p>
    </div>
  )
}
const Total = (prop) => {
  return(
    <p>
      Number of exercises {prop.course.parts[0].exercises + 
                           prop.course.parts[1].exercises +
                           prop.course.parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header  course={course}/>
      <Content course={course}/>
      <Total   course={course}/>
    </div>
  )
}

export default App;
