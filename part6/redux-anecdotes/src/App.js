import { useSelector, useDispatch } from 'react-redux'
import Anecdotes from './components/Anecdotes'

const App = () => {
  return (
    <div>
      <Anecdotes></Anecdotes>
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App