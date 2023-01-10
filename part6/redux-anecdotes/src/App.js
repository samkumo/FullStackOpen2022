import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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