import { useState } from "react";

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>This anecdote has {votes} votes</p>
    </div>
  );
};
const AnecdoteTop = ({ anecdotes, votes }) => {
  const topVotes = Math.max(...votes);
  const topIndex = votes.indexOf(topVotes);
  const text = anecdotes[topIndex];
  return (
    <div>
      <p>{text}</p>
      <p>It has {topVotes} votes</p>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const selectRandomAnecdote = ({ anecdotes }) => {
  const random = getRandomInt(anecdotes.length);
  return random;
};
const addVote = ({ votes, selected }) => {
  const newVotes = [...votes];
  newVotes[selected] += 1;
  return newVotes;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [selected, setSelected] = useState(0);

  //Votes array the size of our anecdotes array
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}></Anecdote>
      <Button
        handleClick={() => setVotes(addVote({ votes, selected }))}
        text="Vote"
      ></Button>
      <Button
        handleClick={() => setSelected(selectRandomAnecdote({ anecdotes }))}
        text="Next anecdote"
      />
      <h1>Anecdote with most votes</h1>
      <AnecdoteTop anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
