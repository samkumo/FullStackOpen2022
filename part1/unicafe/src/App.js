import { useState } from "react";

const Button = (props) => (
  < button onClick={props.handleClick} >
    {props.text}
  </button >
)
const Display = (props) => (
  <div>
    <p>Good {props.good}</p>
    <p>Neutral: {props.neutral}</p>
    <p>Bad: {props.bad}</p>
  </div>
)

const App = () => {
  // save clicks of each button to it's own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      </div>
      <h1>Statistics</h1>
      <Display good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
