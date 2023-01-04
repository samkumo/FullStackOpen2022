import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification></Notification>
      <Anecdotes></Anecdotes>
      <NewAnecdote></NewAnecdote>
    </div>
  )
}
export default App