import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import "./index.css"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
      .catch(error => console.log(error.message))
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
      .then((returnednote) => {
        setNotes(notes.concat(returnednote))
        setNewNote('')
      })
      .catch(error => console.log(error.message))
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnednote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnednote)))
      })
      .catch((error) => {
        alert("This note '" + note.content + "' does not exist anymore")
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}></input>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
