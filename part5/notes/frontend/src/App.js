import Note from './components/Note'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import "./index.css"
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
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

  const addNote = (noteObject) => {
    noteService.create(noteObject)
      .then((returnednote) => {
        setNotes(notes.concat(returnednote))
      })
      .catch(error => console.log(error.message))
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

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

  return (
    <div className="App">
      <h1>Application</h1>
      <Notification message={errorMessage} />
      {user === null
        ? <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}>
          </LoginForm>
        </Togglable>
        : <div>
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogout}>
            <button type='submit'>Logout</button>
          </form>
          <Togglable buttonLabel='New note'>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      }
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
    </div >
  )
}

export default App
