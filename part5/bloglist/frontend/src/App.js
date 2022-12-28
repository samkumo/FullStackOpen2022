import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )
  }, [blog])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
      console.log('Wrong credentials')
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      // const blog = { title: title, author: author, url: url }
      const body = {}
      body.title = title
      body.author = author
      body.url = url
      await blogService.create(body)
      setBlog({ title: title, author: author, url: url })
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`A new blog '${title}' by ${author} was added!`)
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (error) {
      setBlog(null)
      console.log(error.message)
      setErrorMessage('Blog could not be added!')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          Username
          <input type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}>
          </input><br />
          Password
          <input type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }
  const BlogForm = () => {
    return (
      <form onSubmit={handleAddBlog}>
        <h2>Add new blog:</h2>
        <div>
          Title:
          <input type='text' value={title} name='Title'
            onChange={({ target }) => setTitle(target.value)}>
          </input><br />
          Author:
          <input type='text' value={author} name='Author'
            onChange={({ target }) => setAuthor(target.value)}>
          </input><br />
          Url:
          <input type='text' value={url} name='Url'
            onChange={({ target }) => setUrl(target.value)}>
          </input><br />
        </div>
        <button type='submit'>Create</button>
      </form>
    )
  }
  const Blogs = (props) => {
    return (
      <div>
        <h2>Blogs</h2>
        {
          props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)
        }
      </div>)
  }

  return (
    <div>
      <h1>Application</h1>
      <Notification message={errorMessage} type='error'></Notification>
      <Notification message={successMessage} type='success'></Notification>
      {user === null
        ? LoginForm()
        : <div><p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button></div>}
      {user !== null && BlogForm()}
      {user !== null && <Blogs blogs={blogs} />}
    </div>
  )
}

export default App