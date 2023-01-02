import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'TOGGLE_IMPORTANCE':

    default:
      return state
  }
}
const store = createStore(noteReducer)
store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})
store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2
  }
})



function App() {
  return (
    <div className="App">
      <ul>
        {store.getState().map(note => {
          <li key={note.id}>
            {note.conten}<strong>{note.important ? 'important' : ''}</strong>
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
