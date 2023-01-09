//App.js with MaterialUI styling

import { useState } from 'react'
import './App.css'
import { useField } from './hooks/index'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Button,
  Alert,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu' />
        <Button color='inherit' component={Link} to='/'>Home</Button>
        <Button color='inherit' component={Link} to='/create'>Create New</Button>
        <Button color='inherit' component={Link} to='/about'>About</Button>
      </Toolbar>
    </AppBar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <TableBody>
        {anecdotes.map(anecdote =>
          <TableRow key={anecdote.id}>
            <TableCell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </TableCell>
            <TableCell>
              {anecdote.author}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
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
        <Alert severity='success'>{props.message}</Alert>
      )}
    </div>
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
        <div>
          <TextField label='content' type={content.type} name='content' value={content.value} onChange={(e) => content.onChange(e)} />
        </div>
        <div>
          <TextField label='author' type={author.type} name='author' value={author.value} onChange={(e) => author.onChange(e)} />
        </div>
        <div>
          <TextField label='info' type={info.type} name='info' value={info.value} onChange={(e) => info.onChange(e)} />
        </div>
        <Button variant='contained' color='primary' type='submit'>Create</Button>
        <Button variant='contained' color='secondary' onClick={handleClear}>Clear</Button>
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
    <Container>
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
    </Container>
  )
}

export default App
