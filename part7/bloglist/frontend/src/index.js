import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
} from 'react-router-dom'

const Home = () => {
    <div>
        <h2>TKTL Notes app</h2>
        <p>Insert some completely random text here....</p>
    </div>
}
const Note = ({ notes }) => {
    const id = useParams().id
    const note = notes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}
const Notes = ({ notes }) => {
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>)}
        </ul>
    </div>
}
const Users = () => {
    <div>
        <h2>TKL notes App</h2>
        <ul>
            <li>Samuli Kumo</li>
            <li>Test User</li>
            <li>Random Blogger</li>
        </ul>
    </div>
}
const Login = (props) => {
    const navigate = useNavigate()
    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('samkumo')
        navigate('/')
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username <input />
                </div>
                <div>
                    password: <input type='password' />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
const App = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Samuli Kumo'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Samuli Kumo'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Random Blogger'
        }
    ])
    const [user, setUser] = useState(null)
    const login = (user) => {
        setUser(user)
    }
    const padding = { padding: 5 }
    return (
        <div>
            <Router>
                <div>
                    <Link style={padding} to='/'>HOME</Link>
                    <Link style={padding} to='/notes'>NOTES</Link>
                    <Link style={padding} to='/users'>USERS</Link>
                    {user
                        ? <em>{user} logged in</em>
                        : <Link style={padding} to="/login">LOGIN</Link>
                    }
                </div>

                <Routes>
                    <Route path='/notes/:id' element={<Note notes={notes} />} />
                    <Route path='/notes/' element={<Notes notes={notes} />} />
                    <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
                    <Route path='/login' element={<Login onLogin={login} />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </Router>
            <div>
                <br />
                <em>Note app, FullStackOpen 2022</em>
            </div>
        </div>
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)