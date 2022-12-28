import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
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
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
    blogService.setToken(null)
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
      <Notification message={errorMessage}></Notification>
      {user === null
        ? LoginForm()
        : <div><p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button></div>}
      {user !== null && <Blogs blogs={blogs} />}
    </div>
  )
}

export default App