//App.js with Bootstrap styling

import { useState } from 'react'
import './App.css'
import { useField } from './hooks/index'
import { Table, Form, Button, Alert } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  redirect,
} from 'react-router-dom'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <NavBar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <NavBar.Toggle aria-controls='responsive-navbar-nav' />
      <NavBar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/'>Anecdotes</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/create'>Create New</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/about'>About</Link>
          </Nav.Link>
        </Nav>
      </NavBar.Collapse>
    </NavBar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  if (anecdote)
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <div>
          {anecdote.author}<br />
          {anecdote.info}
        </div>
      </div>
    )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)
const Notification = (props) => {
  return (
    <div classname='container'>
      {(props.message &&
        <Alert variant='success'>{props.message}</Alert>
      )}
    </div>
    /*    <div>
         {props.message}
       </div> */
  )
}

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e);
    console.log(content);
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }
  const handleClear = (e) => {
    e.preventDefault()
    content.clear()
    author.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            type={content.type}
            name='content'
            value={content.value}
            onChange={(e) => content.onChange(e)}
          >
          </Form.Control>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type={author.type}
            name='author'
            value={author.value}
            onChange={(e) => author.onChange(e)}
          >
          </Form.Control>
          <Form.Label>Info:</Form.Label>
          <Form.Control
            type={info.type}
            name='info'
            value={info.value}
            onChange={(e) => info.onChange(e)}
          >
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>Create</Button>
        <Button variant='secondary' onClick={handleClear}>Clear</Button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`New Anecdote added: ${anecdote.content}!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className='container'>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Notification message={notification} />
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
      <br />
      <Footer />
    </div>
  )
}

export default App
