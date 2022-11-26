const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}
const Content = (prop) => {
  return(
    <>
      <Part part={prop.parts[0]}/>
      <Part part={prop.parts[1]}/>
      <Part part={prop.parts[2]}/>
    </>
  )
}
const Part = (prop) => {
  console.log(prop)
  return(
    <div>
      <p>{prop.part.name} {prop.part.exercises}</p>
    </div>
  )
}
const Total = (prop) => {
  return(
    <p>Number of exercises {prop.parts[0].exercises + 
                            prop.parts[1].exercises +
                            prop.parts[2].exercises}</p>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total   parts={parts}/>
    </>
  )
}

export default App;
