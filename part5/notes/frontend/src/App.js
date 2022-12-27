import Note from './components/Note'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import "./index.css"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
      .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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
        setErrorMessage(`Note ${note.contet} does not exist anymore!`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
      console.log('Wrong credentials');
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    console.log('logging in with', username, password);
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
    noteService.setToken(null)
  }
  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          Username
          <input type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}>
          </input><br></br>
          Password
          <input type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div >
        <button type='submit'>Login</button>
      </form >
    )
  }
  const NoteForm = () => {
    return (
      <div>

        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}></input>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Application</h1>
      <Notification message={errorMessage} />
      {user === null
        ? LoginForm()
        : <div><p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button></div>}
      <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </div>
      {user !== null && NoteForm()}
    </div >
  )
}

export default App
