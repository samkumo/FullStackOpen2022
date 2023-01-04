import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter';

function App() {
  return (
    <div>
      <NewNote></NewNote>
      <VisibilityFilter></VisibilityFilter>
      <Notes></Notes>
    </div>
  )
}

export default App;
