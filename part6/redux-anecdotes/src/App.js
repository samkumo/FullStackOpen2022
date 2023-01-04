import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anec => dispatch(setAnecdotes(anec)))
  }, [dispatch])

  return (
    <div>
      <Notification></Notification>
      <Anecdotes></Anecdotes>
      <NewAnecdote></NewAnecdote>
    </div>
  )
}
export default App