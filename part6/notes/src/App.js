import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter';
import { setNotes } from './reducers/noteReducer';
import noteService from './services/notes'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NewNote></NewNote>
      <VisibilityFilter></VisibilityFilter>
      <Notes></Notes>
    </div>
  )
}

export default App;
