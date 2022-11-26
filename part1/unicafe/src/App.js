import { useState } from "react";

const Button = (props) => (
  < button onClick={props.handleClick} >
    {props.text}
  </button >
)
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = (good * 1 + bad * -1) / all
  const pos = (good / all) * 100

  if (all === 0) {
    return (
      <div>Feedback not given</div>
    )
  }
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {avg}</p>
      <p>Positive: {pos} %</p>
    </div>
  )
}

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
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  )
}

export default App;
