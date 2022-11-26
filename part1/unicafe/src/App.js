import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = ({ text, value, unit }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {unit}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = Number((good * 1 + bad * -1) / all).toFixed(2);
  const pos = Number((good / all) * 100).toFixed(2);

  if (all === 0) {
    return <div>Feedback not given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={avg} />
        <StatisticLine text="Positive" value={pos} unit="%" />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to it's own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
  );
};

export default App;
